import { useParams } from 'react-router-dom';


export function withRouter(Component) {
    return(props) => {
        const match = {params: useParams()}
        return (
            <Component
                {...props}
                router={match}
            />
        );
    }
  }