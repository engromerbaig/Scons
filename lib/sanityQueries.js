import client from './sanityClient';

export async function getPosts() {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    body,
    metaTitle,
    metaDescription
  }`;

  const posts = await client.fetch(query);
  return posts;
}
