import classes from './Post.module.css'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type PropsType = {
  message: string
  likesCount: number
}

const Post = (props: PropsType) => {
  return (
    <div className={classes.item}>
        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
        <div className={classes.itemText}>{props.message}</div>
    </div>
  )
}

export default Post;