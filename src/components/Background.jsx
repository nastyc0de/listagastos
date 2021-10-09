import React from 'react'
import styled from 'styled-components'
import {ReactComponent as Puntos} from '../images/puntos.svg'

const Svg = styled.svg`
	height: 50vh;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 0;
	path {
		fill: rgba(135,182,194, .15);
	}
`;
const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;
const Background = () => {
    return (
        <>
         <PuntosArriba/>
         <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
             <path 
                fill="#0099ff" 
                fillOpacity="1" 
                d="M0,128L6.9,122.7C13.7,117,27,107,41,117.3C54.9,128,69,160,82,154.7C96,149,110,107,123,112C137.1,117,151,171,165,202.7C178.3,235,192,245,206,256C219.4,267,233,277,247,266.7C260.6,256,274,224,288,213.3C301.7,203,315,213,329,218.7C342.9,224,357,224,370,229.3C384,235,398,245,411,256C425.1,267,439,277,453,272C466.3,267,480,245,494,250.7C507.4,256,521,288,535,272C548.6,256,562,192,576,149.3C589.7,107,603,85,617,96C630.9,107,645,149,658,149.3C672,149,686,107,699,74.7C713.1,43,727,21,741,10.7C754.3,0,768,0,782,37.3C795.4,75,809,149,823,192C836.6,235,850,245,864,224C877.7,203,891,149,905,154.7C918.9,160,933,224,946,234.7C960,245,974,203,987,192C1001.1,181,1015,203,1029,208C1042.3,213,1056,203,1070,208C1083.4,213,1097,235,1111,213.3C1124.6,192,1138,128,1152,85.3C1165.7,43,1179,21,1193,53.3C1206.9,85,1221,171,1234,202.7C1248,235,1262,213,1275,181.3C1289.1,149,1303,107,1317,112C1330.3,117,1344,171,1358,208C1371.4,245,1385,267,1399,277.3C1412.6,288,1426,288,1433,288L1440,288L1440,320L1433.1,320C1426.3,320,1413,320,1399,320C1385.1,320,1371,320,1358,320C1344,320,1330,320,1317,320C1302.9,320,1289,320,1275,320C1261.7,320,1248,320,1234,320C1220.6,320,1207,320,1193,320C1179.4,320,1166,320,1152,320C1138.3,320,1125,320,1111,320C1097.1,320,1083,320,1070,320C1056,320,1042,320,1029,320C1014.9,320,1001,320,987,320C973.7,320,960,320,946,320C932.6,320,919,320,905,320C891.4,320,878,320,864,320C850.3,320,837,320,823,320C809.1,320,795,320,782,320C768,320,754,320,741,320C726.9,320,713,320,699,320C685.7,320,672,320,658,320C644.6,320,631,320,617,320C603.4,320,590,320,576,320C562.3,320,549,320,535,320C521.1,320,507,320,494,320C480,320,466,320,453,320C438.9,320,425,320,411,320C397.7,320,384,320,370,320C356.6,320,343,320,329,320C315.4,320,302,320,288,320C274.3,320,261,320,247,320C233.1,320,219,320,206,320C192,320,178,320,165,320C150.9,320,137,320,123,320C109.7,320,96,320,82,320C68.6,320,55,320,41,320C27.4,320,14,320,7,320L0,320Z">
            </path>
        </Svg>   
         <PuntosAbajo/>   
        </>
    )
}

export default Background