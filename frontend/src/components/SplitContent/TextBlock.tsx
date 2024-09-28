import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Button from '../Button';
import Form from '../Form';

import styles from './textBlock.module.scss';

export default function TextBlock({
  data,
}: {
  data: any
}) {
  const {
    text,
    enableForm,
  } = data;

  // options for custom components in contentful
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        // const { title, description } = node.data.target.fields;
        // only have one component so do need to check the type for which one to return
        const componentData = node?.data?.target?.fields;

        const {
          buttonText,
          buttonHref,
        } = componentData;

        return (
          <Button
            href={buttonHref}
            isLink
          >{buttonText}</Button>
        )
      }
    }
  };

  return (
    <div className={styles.textWrapper}>
      {text && (
        documentToReactComponents(text, options)
      )}
      {enableForm && (
        <Form />
      )}
    </div>
  );
}