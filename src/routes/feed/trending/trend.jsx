import React from 'react'
import { useEffect } from 'react'

const Trend = ({ hint, instance, stats, first = '', last = '' }) => {
	var styles = {}
	if (first) {
		styles = {
			borderTopLeftRadius: '1rem !important',
			borderTopRightRadius: '1rem !important',
		}
	}

	return (
		<section className={`d-flex flex-column ${first && 'first'} ${last && 'last'}`}>
			<div className=''>
				<b>{hint}</b>
			</div>
			<div style={{ padding: '.2rem 0' }}>
				<span>{instance}</span>
			</div>
			<small className='font-sm'>{stats}</small>
		</section>
	)
}

export default Trend
