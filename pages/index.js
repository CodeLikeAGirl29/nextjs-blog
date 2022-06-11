import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import "./styles/global.module.css";
import Link from "next/link";
import Date from "../components/date";
import SocialMedia from "./components/SocialMedia";

import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<SocialMedia />
			<section className={utilStyles.headingMd}>
				<p>
					My name is Lindsey and I am a Full Stack Web Developer based in North
					Carolina's gorgeous capital - Raleigh.
				</p>
				<p className='container'>
					Be sure to check out my <a href='https://lindseyk.dev'>Portfolio</a> &{" "}
					<a href='http://github.com/codelikeagirl29'>GitHub</a>
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
