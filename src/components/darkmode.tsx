import React, { useEffect, useState } from 'react';

const DarkMode = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // 로컬스토리지에서 다크모드 상태를 가져옴
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        // 브라우저의 다크모드 상태를 가져옴
        const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // 다크모드 상태를 설정
        setDark(isDarkMode || isBrowserDarkMode);

        // 다크모드 상태가 변경될 때마다 로컬스토리지에 저장
        const handleDarkModeChange = (event: MediaQueryListEvent) => {
            setDark(event.matches);
            localStorage.setItem('darkMode', event.matches.toString());
        };

        // 브라우저의 다크모드 상태 변경을 감지
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleDarkModeChange);

        return () => {
            // 이벤트 리스너 제거
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleDarkModeChange);
        };
    }, []);

    // dark 상태에 따라 UI를 조정하는 코드 작성

    return (
        <div>
            {/* dark 상태에 따른 UI */}
        </div>
    );
};

export default DarkMode;