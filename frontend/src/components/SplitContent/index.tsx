import Container from '../Container';
import GoogleMap from '../GoogleMap';
import ImageBlock from './ImageBlock';
import TextBlock from './TextBlock';

import styles from './splitContent.module.scss';

interface NodeType {
  nodeType: string,
  data: {},
  content: Array<object>,
}

interface ContentfulData {
  metadata: {
    tags: Array<string>,
  },
  sys: {
    space: {
      sys: {
        id: string,
        type: string,
        linkType: string,
      }
    },
    id: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    environment: {
      sys: {
        id: string,
        type: string,
        linkType: string,
      }
    },
    revision: number,
    contentType: {
      sys: {
        type: string,
        linkType: string,
        id: string,
      }
    },
    locale: string,
  },
  fields: {
    name: string,
    text: {
      nodeType: string,
      data: {},
      content: Array<NodeType>,
    },
    enableGoogleMap: boolean,
    imageFirst: boolean,
    imageSource: string,
    imageAltText: string,
    enablePriority: boolean,
  }
}

export default function SplitContent({
  imageFirst,
  contentfulData,
}: {
  imageFirst: boolean,
  contentfulData: ContentfulData,
}) {
  const {
    imageSource,
    imageAltText,
    enableGoogleMap,
    enablePriority,
  } = contentfulData.fields;

  const hasImage = imageSource && imageAltText.length > 0;

  const textColumnOnly = (!imageSource && !enableGoogleMap);

  return (
    <section
      className={`${styles.section} ${!imageFirst ? styles.imageLast : ''}`}
    >
      <Container
        borderBottom
      >
        <div className={`${styles.grid} ${(textColumnOnly) ? styles.textOnly : ''}`}>
          {!imageFirst && (
            <>
              <TextBlock data={contentfulData.fields} />
              {hasImage && (
                <ImageBlock
                  imageSource={imageSource}
                  imageAltText={imageAltText}
                  enablePriority={enablePriority}
                  topBorder
                />
              )}
              {enableGoogleMap && (
                <div className={styles.googleMapWrapper}>
                  <GoogleMap
                    id="splitContentMap"
                    noBorder
                  />
                </div>
              )}
            </>
          )}
          {imageFirst && (
            <>
              {hasImage && (
                <ImageBlock
                  imageSource={imageSource}
                  imageAltText={imageAltText}
                  enablePriority={enablePriority}
                />
              )}
              {enableGoogleMap && (
                <div className={styles.googleMapWrapper}>
                  <GoogleMap id="splitContentMap" />
                </div>
              )}
              <TextBlock data={contentfulData.fields} />
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
