import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faFacebook,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialMedia() {
	return (
		<div class='social-container'>
			<a
				href='https://www.github.com/codelikeagirl29'
				className='youtube social'
			>
				<FontAwesomeIcon icon={faGithub} size='2x' />
			</a>
			<a href='https://www.facebook.com/' className='facebook social'>
				<FontAwesomeIcon icon={faFacebook} size='2x' />
			</a>
			<a href='https://www.twitter.com/dev_lindseyk' className='twitter social'>
				<FontAwesomeIcon icon={faTwitter} size='2x' />
			</a>
			<a
				href='https://www.instagram.com/visionarybylindsey'
				className='instagram social'
			>
				<FontAwesomeIcon icon={faInstagram} size='2x' />
			</a>
		</div>
	);
}
