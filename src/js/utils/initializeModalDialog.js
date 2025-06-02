import $ from "jquery";
import { i18n } from "../localization";

/**
 * Gets the title bar for a modal dialog.
 * @param {string} messageId Localized message identifier.
 * @param {object} [messageParameters] Localized message parameters
 * @param {() => void} onClose Function invoked by close button.
 * @returns {JQuery<HTMLElement>} Dialog title bar.
 */
function getDialogTitleBar(messageId, messageParameters, onClose) {
    // HTML structure (TODO: Convert to flexbox)
    const dialogTitleBar = $(`
        <div class="jBox-title" style="height: 47px; padding: 15px 20px;">
            <div style="float: left">${i18n.getMessage(messageId, messageParameters)}</div>
            <div id="dialogclose" style="float: right; cursor: pointer; padding: 5px; margin: -5px;">
                <svg width="10" height="10" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="0" x2="10" y2="10" stroke="var(--surface-950)" stroke-width="2"/>
                    <line x1="0" y1="10" x2="10" y2="0" stroke="var(--surface-950)" stroke-width="2"/>
                </svg>
            </div>
        </div>
    `);
    // Handle close button
    dialogTitleBar.find("#dialogclose").on("click", onClose);
    // Return title bar
    return dialogTitleBar;
}

/**
 * Initializes a modal dialog from an HTML dialog element.
 * @param {JQuery.Selector} buttonSelector JQuery selector for the activation element.
 * @param {JQuery.Selector} dialogSelector JQuery selector for the dialog element.
 * @param {string} messageId Localized message identifier.
 * @param {object} [messageParameters] Localized message parameters
 * @returns {HTMLDialogElement} HTML dialog element.
 */
export function initializeModalDialog(buttonSelector, dialogSelector, messageId, messageParameters) {
    // Get dialog elements
    const dialog = $(dialogSelector);
    const dialogElement = dialog.get(0);
    const dialogContainerElement = dialog.children().first().get(0);
    // Add dialog title bar
    dialog.prepend(getDialogTitleBar(messageId, messageParameters, () => dialogElement.close()));
    // Handle button click
    $(buttonSelector).on("click", () => {
        dialogElement.showModal();
        // Reset any previous scrolling
        dialogContainerElement.scroll(0, 0);
    });
    // Return dialog
    return dialogElement;
}
