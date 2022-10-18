import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ArticleMeta from "../../components/ArticleMeta";
import Layout from "../../components/Layout";
import { ArticleProps, Params } from "../../types/types";
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";
import { getText } from '../../utils/property';
import NotionBlocks from 'notion-block-renderer';

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const { results } = await fetchPages({ slug })
  const page = results[0]
  const pageId = page.id
  const { results: blocks } = await fetchBlocksByPageId(pageId)

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 10,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({})
  const paths = results.map((page: any) => {
    return { params: { slug: getText(page.properties.slug.rich_text) } }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

const Article: NextPage<ArticleProps> = ({ page,blocks }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}

        <div className="my-12">
          <NotionBlocks blocks={blocks} />
        </div>
      </article>
    </Layout>
  );
};

export default Article;
