
import { Link, useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();


    return (
        <div>
            <div>

            </div>

            <div>
                <Link to="/free">자유게시판</Link>
            </div>
            
        </div>
    );
}

export default Home;