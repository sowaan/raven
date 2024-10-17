
export interface RavenBotFiles{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	File URL : Attach	*/
	file_url: string
	/**	File Name : Data	*/
	file_name: string
	/**	File ID : Data	*/
	file_id?: string
}