import React from 'react'
import CollectionItem from '../collection-item/collection-item.component'
import './collection-preview.styles.scss'

const CollectionPreview = ({id,title,items})=>(
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview' key='id'>
            {
                items
                .filter((item,idx)=>idx<4)
                .map(({id,...otherItemProp})=>(
                    <CollectionItem key={id} {...otherItemProp} />
                    
                ))
            }
        </div>
    </div>
)
export default CollectionPreview;