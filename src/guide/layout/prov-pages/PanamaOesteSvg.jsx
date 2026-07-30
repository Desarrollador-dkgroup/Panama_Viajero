const panamaOesteImage = '/maps/provinces/panama-oeste.avif';

const PanamaOesteSvg = ({ className = '', style, onMouseMove, onMouseEnter, onMouseLeave, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 169 177"
            className={className}
            style={style}
        >
            <defs>
                <mask id="panama-oeste-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="169" height="177">
                    <rect x="0" y="0" width="169" height="177" fill="black" />
                    <path
                        d="M126.71,31.87l0,.37c-8.91,13.23-20.44,13.61-32,.76-3.48-3.88-14.68-6.87-15.91-4-2.79,6.49-9.08,12-5.61,20.51,2.07,5,1,10.12-3.77,13.43-5.71,4-11.95,6.37-18.93,3.46-6.16-2.58-8.85.3-10.16,5.9A13.66,13.66,0,0,1,38.78,77c-4.33,6.21-2.89,12.35-1.21,19.14,3.36,13.62,5.49,27.54,8.41,41.27,2,9.5.45,20.33,10,27.58a15.51,15.51,0,0,0,3.48-2c4.76-4.51,8.94-9.78,14.18-13.59,8.19-6,14.45-15.28,26-15.88,1.16-.06,2.25-1.48,3.24-2.16L89,125.08c4.27-3,6.54-5.19,9.23-6.45,5.8-2.72,8.13-6.08,6.22-13-2.14-7.77-2.42-16.54,6.27-20.88,7-3.49,14.57-5.8,22.57-8.58l0-.45.21.31,2.88-9.12S128.63,29,128.15,28,126.71,31.87,126.71,31.87Z"
                        fill="white"
                    />
                </mask>
            </defs>
            <image href={panamaOesteImage} x="5" y="25" width="150" height="135" preserveAspectRatio="xMidYMid slice" mask="url(#panama-oeste-mask)" pointerEvents="none" />
            <path
                d="M126.71,31.87l0,.37c-8.91,13.23-20.44,13.61-32,.76-3.48-3.88-14.68-6.87-15.91-4-2.79,6.49-9.08,12-5.61,20.51,2.07,5,1,10.12-3.77,13.43-5.71,4-11.95,6.37-18.93,3.46-6.16-2.58-8.85.3-10.16,5.9A13.66,13.66,0,0,1,38.78,77c-4.33,6.21-2.89,12.35-1.21,19.14,3.36,13.62,5.49,27.54,8.41,41.27,2,9.5.45,20.33,10,27.58a15.51,15.51,0,0,0,3.48-2c4.76-4.51,8.94-9.78,14.18-13.59,8.19-6,14.45-15.28,26-15.88,1.16-.06,2.25-1.48,3.24-2.16L89,125.08c4.27-3,6.54-5.19,9.23-6.45,5.8-2.72,8.13-6.08,6.22-13-2.14-7.77-2.42-16.54,6.27-20.88,7-3.49,14.57-5.8,22.57-8.58l0-.45.21.31,2.88-9.12S128.63,29,128.15,28,126.71,31.87,126.71,31.87Z"
                fill="transparent"
                pointerEvents="fill"
                style={{ cursor: onClick ? 'pointer' : 'default' }}
                onMouseMove={onMouseMove}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
        </svg>
    );
};

export default PanamaOesteSvg;
