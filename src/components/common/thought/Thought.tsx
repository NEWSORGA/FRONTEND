import './Thought.css'

const Thought = ({ text, avatar, nick }: { text: string, avatar: string, nick: string }) => {
    return (
        <>
            <div className="ThoughtWrapper">
                <div className="DataUserThought">
                    <img src={avatar} className="rounded-circle" style={{ width: "50px" }} />
                    <a className="NickThought">
                        {nick}
                    </a>
                </div>
                <div className="ThoughtText">
                    {text}
                </div>
            </div>
        </>
    );
};
export default Thought;