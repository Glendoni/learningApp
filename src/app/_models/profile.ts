export interface Settingp {
	interface: number;
	qualification: string;
	about_me: string;
}

export interface Created_atp {
	date: string;
	timezone_type: number;
	timezone: string;
}

export interface Languagep {
	id: number;
	description: string;
	code: string;
	languageSpokenLevelArr: string;
	qualified_teacher: number;
	contribute_to_community: number;
	action: number;
	book_me_link: string;
}

export interface Updated_atp {
	date: string;
	timezone_type: number;
	timezone: string;
}

export interface Data {
	nameq: string;
	profile_img: string;
	settings: Settingp[];
	created_at: Created_atp;
	languages: Languagep[];
	updated_at: Updated_atp;
}

export interface ProfileObject {
	data: Data[];
	links: any[];
}