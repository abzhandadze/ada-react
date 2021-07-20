export interface QueryBuilder {
	toQueryMap: () => Map<string, string>
	toQueryString: () => string
}

export class QueryOptions implements QueryBuilder {
	public page: 						number | undefined
	public limit: 						number | undefined
	public _id: 						string | undefined
	public product_id: 					string | undefined
	public code: 						string | undefined
	public select: 						string | undefined
	public product_section: 			string | undefined
	public product_category: 			string | undefined
	public product_sub_category: 		string | undefined


	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor() {}

	toQueryMap() {
		const queryMap = new Map<string, string>()
		
		if (this.limit !== undefined) {
			queryMap.set('limit', `${this.limit}`)
		}

		if (this.page !== undefined) {
			queryMap.set('page', `${this.page}`)
		}

		if (this._id !== undefined) {
			queryMap.set('_id', `${this._id}`)
		}

		if (this.product_id !== undefined) {
			queryMap.set('product_id', `${this.product_id}`)
		}

		if (this.code !== undefined) {
			queryMap.set('code', `${this.code}`)
		}

		if (this.select !== undefined) {
			queryMap.set('select', `${this.select}`)
		}

		if (this.product_section !== undefined) {
			queryMap.set('product_section', `${this.product_section}`)
		}

		if (this.product_category !== undefined) {
			queryMap.set('product_category', `${this.product_category}`)
		}

		if (this.product_sub_category !== undefined) {
			queryMap.set('product_sub_category', `${this.product_sub_category}`)
		}
		
		return queryMap
	}

	toQueryString() {
		let queryString = ''

		this.toQueryMap().forEach((value: string, key: string) => {
			queryString = queryString.concat(`${key}=${value}&`)
		})

		return queryString.substring(0, queryString.length - 1)
	}
}