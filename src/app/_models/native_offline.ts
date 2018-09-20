export interface NativeOffline {
	id: number;
    name: string;
    profileimg: string;
	qualified_teacher: number;
	contribute_to_community: number;
	action: number;
    description: string;
	code: string;
	online: boolean;
}

export interface OfflineObject {
	nativeOffline: NativeOffline[];
}