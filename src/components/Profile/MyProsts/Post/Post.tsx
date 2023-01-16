import classes from './Post.module.css'

type PropsType = {
  message: string
  likesCount: number
}

const Post = (props: PropsType) => {
  return (
    <div className={classes.item}>
        <img src="https://cakeshop.com.ua/images/Wh69BfiEzEE/h:1000/watermark:0.8:ce:0:0:1/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC80MTA4XzEuanBn" alt="" />
        <div>{props.message}</div>
    </div>
  )
}

export default Post;