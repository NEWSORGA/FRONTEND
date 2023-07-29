import './BlockMain.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BlockMain = ({ _iconName }: { _iconName: string }) => {
    return (
        <>
            <div className="blockWrapper d-flex justify-content-center">
                <i className={_iconName}></i>
                <a>Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off. Advantage dependent suspicio</a>
            </div>
        </>
    );
};

export default BlockMain;
