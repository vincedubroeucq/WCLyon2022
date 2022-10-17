/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Import necessary components
 */
import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl, TextControl, TextareaControl, CheckboxControl, RadioControl, SelectControl } from '@wordpress/components';

export const Inspector = ( { attributes, setAttributes } ) => {
    const { rounded, exampleText, exampleTextarea, exampleCheckbox, exampleRadio, exampleSelect } = attributes;

    return (
        <InspectorControls>
            <Panel>
                <PanelBody title={__( 'Block settings', 'my-awesome-block' )}>
                    <ToggleControl
                        label={__( 'Round the corners of the image', 'my-awesome-block' )}
                        checked={ rounded }
                        onChange={ rounded => setAttributes( { rounded } ) }
                    />
                    <TextControl
                        label={__( 'Example text control', 'my-awesome-block' )}
                        value={exampleText}
                        onChange={ exampleText => setAttributes( {exampleText} ) }
                    />
                    <TextareaControl
                        label={__( 'Example Textarea', 'my-awesome-block' )}
                        value={exampleTextarea}
                        onChange={ exampleTextarea => setAttributes( {exampleTextarea} ) }
                    />
                    <CheckboxControl
                        label={__( 'Example Checkbox', 'my-awesome-block' )}
                        checked={exampleCheckbox}
                        onChange={ exampleCheckbox => setAttributes( {exampleCheckbox} ) }
                    />
                    <RadioControl
                        label={__( 'Example Radio', 'my-awesome-block' )}
                        selected={exampleRadio}
                        onChange={ exampleRadio => setAttributes( {exampleRadio} ) }
                        options={[
                            { label: __( 'Value 1', 'my-awesome-block' ), value: 'value1' },
                            { label: __( 'Value 2', 'my-awesome-block' ), value: 'value2' },
                            { label: __( 'Value 3', 'my-awesome-block' ), value: 'value3' },
                        ]}
                    />
                    <SelectControl
                        label={__( 'Example Select', 'my-awesome-block' )}
                        selected={exampleSelect}
                        onChange={ exampleSelect => setAttributes( {exampleSelect} ) }
                        options={[
                            { label: __( 'Value 1', 'my-awesome-block' ), value: 'value1' },
                            { label: __( 'Value 2', 'my-awesome-block' ), value: 'value2' },
                            { label: __( 'Value 3', 'my-awesome-block' ), value: 'value3' },
                        ]}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>
    );
}