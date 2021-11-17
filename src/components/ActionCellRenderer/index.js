import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'

import './index.css'

const ActionCellRenderer = props => {
  const {context, data} = props
  const onClickDeleteIcon = () => context(data)

  return (
    <div>
      <button type="button" className="edit-button">
        <FiEdit />
      </button>
      <button
        type="button"
        className="delete-icon-button"
        onClick={onClickDeleteIcon}
      >
        <AiOutlineDelete />
      </button>
    </div>
  )
}

export default ActionCellRenderer
