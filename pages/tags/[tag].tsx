import type { GetStaticProps, NextPage } from "next";
import Layout from '../../components/Layout';
import { IndexProps, Params, TagProps } from '../../types/types';
import { siteConfig } from '../../site.config';
import { fetchPages } from '../../utils/notion';
import Card from '../../components/Card';
import { GetStaticPaths } from 'next';
import { getMultiSelect, getText } from '../../utils/property';

export const getStaticPaths: GetStaticPaths = async () => {
  const { results }: { results: Record<string, any>[] } = await fetchPages({})

  const pathSet: Set<string> = new Set()
  for (const page of results) {
    for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
      pathSet.add(tag)
    }
  }

  const paths = Array.from(pathSet).map(tag => {
    return {
      params: { tag },
    }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { tag } = context.params as Params
  const { results } = await fetchPages({ tag })
  return {
    props: {
      pages: results ? results : [],
      tag,
    },
    revalidate: 10,
  }
}

const Tag: NextPage<TagProps> = ({ pages, tag }) => {
  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-5xl mb-8">{`#${tag}`}</h1>
        <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
          {/* Card */}
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;
