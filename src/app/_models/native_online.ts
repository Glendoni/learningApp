export interface NativeOnline {
	id: number;
    name: string;
	qualified_teacher: number;
	contribute_to_community: number;
	action: number;
    description: string;
	code: string;
	online: boolean;
}

export interface OnlineObject {
	nativeOnline: NativeOnline[];
}

