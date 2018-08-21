export interface NativeOnline {
	id: number;
    name: string;
	qualified_teacher: number;
	contribute_to_community: number;
	action: number;
	code: string;
	online: boolean;
}

export interface RootObject {
	nativeOnline: NativeOnline[];
}