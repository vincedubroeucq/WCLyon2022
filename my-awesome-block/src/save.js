/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
 import { useBlockProps, RichText } from '@wordpress/block-editor';

 /**
  * The save function defines the way in which the different attributes should
  * be combined into the final markup, which is then serialized by the block
  * editor into `post_content`.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
  *
  * @return {WPElement} Element to render.
  */
 export default function save( { attributes } ) {
	
	const { content, source, image, textAlign, rounded } = attributes;
	const contentClassName = textAlign ? `content has-text-align-${textAlign}` : 'content';
	const imageAttributes = { src: image.src, alt: image.alt || '', height: image.height, width: image.width };
	if (rounded) imageAttributes.class = 'rounded';
 
	return (
		<blockquote { ...useBlockProps.save() }>
			{ image.id && 
				<div className="image">
					<img {...imageAttributes} />
				</div>
			}			
			<div className={contentClassName}>
				<RichText.Content value={ content } />
				<RichText.Content tagName="cite" value={ source } />
			</div>
		</blockquote>
	);
 }
 