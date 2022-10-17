/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Import necessary components
 */
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * 
 * @param {attributes} object       Block attributes 
 * @param {setAttributes} function  Callback to set state   
 * @return {WPElement} Element to render.
 */
export const Controls = ({ attributes, setAttributes }) => {

    // On extrait les attributs pour les utiliser directement
    const { textAlign } = attributes;

    // On utilise AlignmentToolbar pour les alignements de textes et Toolbar, ToolbarGroup, ToolbarButton pour les boutons supplémentaires
    return (
        <BlockControls>
            <AlignmentToolbar
                value={textAlign}
                onChange={ textAlign => setAttributes({ textAlign })}
            />
            <ToolbarGroup label={ __( 'Extra options', 'example-testimonial' ) }>
                <ToolbarButton
                    icon="warning"
                    label={__( 'Does nothing for now !', 'example-testimonial' )}
                    onClick={ () => alert( __( 'Does nothing for now !', 'example-testimonial' ) ) }
                />
            </ToolbarGroup>
        </BlockControls>
    );
}