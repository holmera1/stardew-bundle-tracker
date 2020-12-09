import { CommunityCenter } from "./components/communityCenter";
import 'bootswatch/dist/darkly/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <CommunityCenter />
            <div style={{ textAlign: 'center', bottom: '0' }}>
                <p style={{ fontSize: '12px' }}>&#169; Robert Holmes, 2020</p>
            </div>
        </div>
    );
}

export default App;
