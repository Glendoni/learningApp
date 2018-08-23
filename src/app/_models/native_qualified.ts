export interface NativeQualified {
	id: number;
    name: string;
	qualified_teacher: number;
	contribute_to_community: number;
	action: number;
    description: string;
	code: string;
	online: boolean;
}

export interface RootObject {
	nativeQualified: NativeQualified[];
}