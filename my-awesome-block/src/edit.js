/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
  */
 import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';  // Core
 import { Button } from '@wordpress/components';  // Core
 import { Controls } from './controls';           // Composant de cette extension
 import { Inspector } from './inspector';         // Composant de cette extension
 
 /**
  * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
  * Those files can contain any CSS code that gets applied to the editor.
  *
  * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
  */
 import './editor.scss';
 
 /**
  * The edit function describes the structure of your block in the context of the
  * editor. This represents what the editor will render when the block is used.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
  *
  * @return {WPElement} Element to render.
  */
 export default function edit( { attributes, setAttributes } ) {
 
	 // On extrait les attributs pour les utiliser directement
	 const { content, source, image, textAlign, rounded } = attributes;
 
	 // Fonction déclenchée quand on valide le choix d'une image.
	 const onSelectImage = image => {
		 // On récupère l'id, le titre, et le texte alternatif.
		 const title = image.title || ''; 
		 const id = image.id || 0;
		 const alt = image.alt || '';
 
		 // On essaie de récupérer les url et dimensions d'abord dans la taille "thumbnail" si elle existe
		 const src = image?.sizes?.thumbnail?.url ? image.sizes.thumbnail.url : image.url;
		 const height = image?.sizes?.thumbnail?.height ? image.sizes.thumbnail.height : image.height;
		 const width = image?.sizes?.thumbnail?.width ? image.sizes.thumbnail.width : image.width;
		 
		 // On sauvegarde
		 setAttributes( { image: { id, title, alt, src, width, height } } );
	 }
 
	 // Fonction appelée quand l'image est supprimée. Elle vide l'attribut image, simplement.
	 const onDeleteImage = () => { setAttributes( { image : {} } ) };
 
	 // On prépare quelques variables pour faciliter l'affichage.
	 const contentClassName = textAlign ? `content has-text-align-${textAlign}` : 'content';
	 const imageAttributes = { src: image.src, alt: image.alt || '', height: image.height, width: image.width };
	 // On ajoute la classe CSS pour l'image uniquement si on en a besoin, poour éviter l'attribut class vide.
	 if (rounded) imageAttributes.class = 'rounded';
 
	 // Le return doit contenir ce qu'on veut afficher dans l'éditeur
	 // useBlockProps() permet d'injecter les classes CSS et attributs styles nécessaires automatiquement
	 // On peut lui passer un objet avec des attributs supplémentaires
	 return (
		 <>
			 <Controls attributes={attributes} setAttributes={setAttributes} />
			 <Inspector attributes={attributes} setAttributes={setAttributes} />
			 <blockquote { ...useBlockProps() }>
				 <div className="image">
					 {image.id ?
						 <div className="wrapper image-wrapper">
							 <img {...imageAttributes} />
							 <Button icon="dismiss" isDestructive="true" variant="link" onClick={ onDeleteImage }><span class="screen-reader-text">{ __( 'Remove image', 'my-awesome-block' ) }</span></Button> 
						 </div>
					 :
						 <MediaUploadCheck>
							 <MediaUpload
								 onSelect={onSelectImage}
								 allowedTypes={ ['image'] }
								 render={ ( { open } ) => 
									 <Button variant="secondary" onClick={ open } icon="cover-image" className="add-media">
										 <span class="screen-reader-text">{__( 'Open Media Library', 'my-awesome-block' )}</span>
									 </Button> 
								 }
							 />
						 </MediaUploadCheck>
					 }
				 </div>
				 <div className={contentClassName}>
					 <RichText
						 value={ content }
						 multiline={true}
						 onChange={ content => setAttributes( { content } ) }
						 placeholder={ __( 'Text content here', 'my-awesome-block' ) }
					 />
					 <RichText
						 tagName="cite"
						 className="citation"
						 value={ source }
						 multiline={false}
						 allowedFormats={ [] }
						 onChange={ source => setAttributes( { source } ) }
						 placeholder={ __( 'Source', 'my-awesome-block' ) }
					 />
				 </div>
			 </blockquote>
		 </>
	 );
 }
 