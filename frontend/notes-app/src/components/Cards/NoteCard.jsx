import React from 'react'
import { MdOutlinePushPin} from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment';

const NoteCard = ({title,
     date,
     content,
     tags, 
     isPinned,
     color,
     fontColor,
     fontColorContent,
     tagColorContent,
     titleFont, 
     contentFont,
     tagFont ,
     onEdit, 
     onDelete, 
     onPinNote,
     modifiedOn 
    }) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out' style={{ backgroundColor: 
   color, color: fontColor,  margin:'20px'}}>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'   style={{ fontFamily: titleFont }} >{title}</h6>
                {modifiedOn && modifiedOn !== date ? (
                <div>
                  <span className='text-xs text-slate-500'>
                  Created: {moment(date).format('DD MMM YYYY')}
                  </span>
            <div>
              <span className='text-xs text-slate-500'>
                Modified: {moment(modifiedOn).format('DD MMM YYYY')}
              </span>
            </div>
            </div>
          ):(
          <span className='text-xs text-slate-500'>
                            {moment(date).format('DD MMM YYYY')}
                        </span>
                    )}
                </div>

            <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'} `}
             onClick={onPinNote}/>
             </div>
            <p className='text-xs text-slate-600 mt-2'   style={{ fontFamily: contentFont , color: fontColorContent}}>{content?.slice(0,60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500' style={{ fontFamily: tagFont, color: tagColorContent }}>{tags.map((item)=> `#${item} `)}</div>
                    <div className='flex items-center gap-2'>
                        <MdCreate 
                            className='icon-btn hover:text-green-600' 
                            onClick={onEdit}
                        />

                        <MdDelete className='icon-btn hover:text-red-500'
                            onClick={onDelete}
                        />
                    </div>
                
            </div>
        </div>
  )
}

export default NoteCard