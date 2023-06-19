import { isDefNotNull } from 'src/app/utilities/utility-functions';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-changed-text-renderer',
  templateUrl: './changed-text-renderer.component.html',
  styleUrls: ['./changed-text-renderer.component.css']
})
export class ChangedTextRendererComponent implements OnInit, OnChanges {
    // Parses and splits the text passed based on this string, adds back on display
    @Input() wordSeparator: string;

    @Input() oldText: string;
    @Input() newText: string;

    @Input() indicationMode: TextChangeIndicationMode;

    oldTextSeparated: string[];
    newTextSeparated: string[];

    normalIndicationContent: ReplacedWords[];
    replaceWordsContent: ReplacedWords[];

    TextChangeIndicationMode = TextChangeIndicationMode;

    // Optional for aria-label configuration
    @Input() changeMaker: string;

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (
            isDefNotNull(this.oldText) && isDefNotNull(this.newText) &&
            isDefNotNull(this.wordSeparator) && isDefNotNull(this.indicationMode)
        ) { // Everything required is available
            this.buildRendererContent();
        }
    }

    // Driver Function
    buildRendererContent() {
        this.oldText = this.oldText.trim();
        this.newText = this.newText.trim();

        this.oldTextSeparated = this.oldText.split(this.wordSeparator);
        this.newTextSeparated = this.newText.split(this.wordSeparator);

        switch (this.indicationMode) {
            case TextChangeIndicationMode.ReplaceWords:
                this.replaceWordsContent = this.getReplaceWordContent();
                break;
            case TextChangeIndicationMode.Normal:
                this.normalIndicationContent = this.getNormalIndicationContent();
                break;

            default: break;
        }
    }

    /**
     * 
     * @returns { ReplacedWords[] } An array of ReplacedWords Objects, each annotated with appropriate styling class
     */
    getReplaceWordContent(): ReplacedWords[] {
        const content: ReplacedWords[] = [];

        // Acknowledge the old text
        this.oldTextSeparated.forEach(wordsSlice => {
            if (!this.newTextSeparated.includes(wordsSlice)) {
                content.push(<ReplacedWords>{
                    text: wordsSlice,
                    class: ModifiedTextStyle.LineThrough,
                    ariaLabel: this.getReplacedTextAriaLabel(wordsSlice, ReplaceType.Removed)
                });
            }
            else {
                content.push(<ReplacedWords>{
                    text: wordsSlice,
                });
            }
        })

        // Address any new content added
        this.newTextSeparated.filter(wordsSlice => !this.oldTextSeparated.includes(wordsSlice)).forEach(wordsSlice => {
            content.push(<ReplacedWords>{
                text: wordsSlice,
                class: ModifiedTextStyle.AddClass,
                ariaLabel: this.getReplacedTextAriaLabel(wordsSlice, ReplaceType.Added)
            });
        })
        
        return content;
    }

    /**
     * 
     * @returns { ReplacedWords[] } An array of ReplacedWords Objects, each annotated with appropriate styling class
     */
    getNormalIndicationContent(): ReplacedWords[] {
        const content = [];

        let oldTextPtr = 0;
        let newTextPtr = 0;

        while (oldTextPtr < this.oldTextSeparated.length || newTextPtr < this.newTextSeparated.length) {

            if (oldTextPtr >= this.oldTextSeparated.length) {
                // If the old text array is completely exhausted, 
                // add the remaining stuff in new text array as red font (completely new)
                content.push(<ReplacedWords>{
                    text: this.newTextSeparated.slice(newTextPtr).join(this.wordSeparator),
                    class: ModifiedTextStyle.AddClass,
                    ariaLabel: this.getReplacedTextAriaLabel(this.newTextSeparated.slice(newTextPtr).join(this.wordSeparator), ReplaceType.Added)
                });

                // Move the new text pointer to the end
                newTextPtr = this.newTextSeparated.length;
            }
            else if (newTextPtr >= this.newTextSeparated.length) {
                // If the new text array is completely exhausted,
                // add the remaining stuff in old text array as line through style (completely removed)
                content.push(<ReplacedWords>{
                    text: this.oldTextSeparated.slice(oldTextPtr).join(this.wordSeparator),
                    class: ModifiedTextStyle.LineThrough,
                    ariaLabel: this.getReplacedTextAriaLabel(this.oldTextSeparated.slice(oldTextPtr).join(this.wordSeparator), ReplaceType.Removed)
                });

                // Move the old text pointer to the end as well
                oldTextPtr = this.oldTextSeparated.length;
            }
            else { // We have stuff in both old and new to consider

                // Normal Check
                if (this.oldTextSeparated[oldTextPtr] === this.newTextSeparated[newTextPtr]) {
                    content.push(<ReplacedWords>{
                        text: this.newTextSeparated[newTextPtr],
                    });

                    ++oldTextPtr;
                    ++newTextPtr;
                }
                else {
                    // Find the next common match in both arrays
                    let nextIndexInOld = this.oldTextSeparated.length + 1;
                    let nextIndexInNew = this.newTextSeparated.slice(newTextPtr).findIndex(slice => {
                        return this.oldTextSeparated.slice(oldTextPtr).findIndex((oldSlice, index) => {
                            if (oldSlice === slice) nextIndexInOld = index + oldTextPtr;
                            return oldSlice === slice; // Will use regular expressions here for better matches
                        }) !== -1
                    }) + newTextPtr;

                    // No more matches (everything removed)
                    if (nextIndexInOld > this.oldTextSeparated.length) {
                        // Move to the end of new text list
                        nextIndexInNew = this.newTextSeparated.length + 1;
                    };

                    // Add the removed content
                    content.push(<ReplacedWords>{
                        text: this.oldTextSeparated.slice(oldTextPtr, nextIndexInOld).join(this.wordSeparator),
                        class: ModifiedTextStyle.LineThrough,
                        ariaLabel: this.getReplacedTextAriaLabel(this.oldTextSeparated.slice(oldTextPtr, nextIndexInOld).join(this.wordSeparator), ReplaceType.Removed)
                    });
                    // Add the added content
                    content.push(<ReplacedWords>{
                        text: this.newTextSeparated.slice(newTextPtr, nextIndexInNew).join(this.wordSeparator),
                        class: ModifiedTextStyle.AddClass,
                        ariaLabel: this.getReplacedTextAriaLabel(this.newTextSeparated.slice(newTextPtr, nextIndexInNew).join(this.wordSeparator), ReplaceType.Added)
                    });

                    oldTextPtr = nextIndexInOld;
                    newTextPtr = nextIndexInNew;
                }
            }
        }
        
        // Change indication mode to 'Replace All' if appropriate for better aria labels
        if (
            content.length === 2 && // There were 2 word slices
            content.find(slice => this.wordSliceWasAdded(slice)) && // One was added
            content.find(slice => this.wordSliceWasRemoved(slice)) // One was removed
        ) {
            // That's a Replace All
            this.indicationMode = TextChangeIndicationMode.ReplaceAll;

            this.oldText = content.find(slice => this.wordSliceWasRemoved(slice))?.text!;
            this.newText = content.find(slice => this.wordSliceWasAdded(slice))?.text!;
        }
        return content;
    }

    /**
     * 
     * @param text Text content for replaced text slice
     * @param { ReplaceType } replaceType Type of replacement for text slice  
     * @returns Generated aria label based on replace type (added or removed)
     */
    getReplacedTextAriaLabel(text: string, replaceType: ReplaceType): string {
        if (text.trim().length) {
            if (replaceType === ReplaceType.Added) {
                return `${text} was added${isDefNotNull(this.changeMaker) ? ` by ${this.changeMaker}` : ''}.`;
            }
            else {
                return `${text} was removed${isDefNotNull(this.changeMaker) ? ` by ${this.changeMaker}` : ''}.`;
            }
        }
        return `Empty value was added${isDefNotNull(this.changeMaker) ? ` by ${this.changeMaker}` : ''}.`;
    }

    //#region Queries

    wordSliceWasRemoved(slice: ReplacedWords): boolean {
        return slice.class === ModifiedTextStyle.LineThrough;
    }

    wordSliceWasAdded(slice: ReplacedWords): boolean {
        return slice.class === ModifiedTextStyle.AddClass;
    }

    //#endregion

}

/**
 * Format to indicate the old to new text changes 
 * 
 * Preferences
 * @enum {TextChangeIndicationMode.Normal} - Text Only
 * @enum {TextChangeIndicationMode.ReplaceWords} - Multi-Picked Reference Data (e.g. Ministries, Related KAs)
 * @enum {TextChangeIndicationMode.ReplaceAll} - Singly-Picked Reference Data (e.g. Risk Likelihood, Risk Status)
 */
export enum TextChangeIndicationMode {
    Normal = 'Normal',
    ReplaceWords = "ReplaceWords",
    ReplaceAll = "ReplaceAll",
}

//#region Private Utils

interface ReplacedWords {
    text: string,
    class?: ModifiedTextStyle,
    ariaLabel?: string
}

enum ModifiedTextStyle {
    AddClass = 'add-class',
    LineThrough = 'line-through'
}

enum ReplaceType {
    Added = 'added',
    Removed = 'removed'
}

//#endregion

