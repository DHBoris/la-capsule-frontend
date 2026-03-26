import React, { useEffect, useRef } from 'react';
import styles from '../assets/styles/components/parallax.module.css';

export const Parallax = ({
    children,
    backgroundSize = 'cover',
    sensitivityX = 1,
    sensitivityY = 0,
    gyroscope = true
}) => {
    const container = useRef(null);
    const layers = React.Children.toArray(children);

    useEffect(() => {
        if (container.current === null) return;

        const applyParallax = (e) => {
            const elements = Array.from(container.current.children);

            if (sensitivityX) {
                elements.map((el) => {
                    const layerSensitivity = el.dataset['sensitivity'];
                    if (layerSensitivity) {
                        const positionX =
                            e.type === 'deviceorientation' ? e.gamma * 0.01 : (e.clientX / window.innerWidth) * 2 - 1;
                        const offsetX = layerSensitivity * positionX * sensitivityX;
                        el.style.backgroundPositionX = `calc(50% + ${offsetX}px)`;
                    }
                });
            }
            if (sensitivityY) {
                elements.map((el) => {
                    const layerSensitivity = el.dataset['sensitivity'];
                    if (layerSensitivity) {
                        const positionY =
                            e.type === 'deviceorientation' ? e.beta * 0.01 : (e.clientY / window.innerHeight) * 2 - 1;
                        const offsetY = layerSensitivity * positionY * sensitivityY;
                        el.style.backgroundPositionY = `calc(50% + ${offsetY}px)`;
                    }
                });
            }
        };

        const handleMouseMove = (e) => {
            applyParallax(e);
        };

        const handleDeviceOrientation = (e) => {
            if (e.gamma !== null) applyParallax(e);
        };

        document.addEventListener('mousemove', handleMouseMove);
        if ('DeviceOrientationEvent' in window && gyroscope)
            window.addEventListener('deviceorientation', handleDeviceOrientation);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, [container.current]);

    return (
        <div ref={container} className={styles.parallax}>
            {layers.map((layer, index) => (
                <Layer
                    key={index}
                    imageSet={layer.props.imageSet}
                    sensitivity={layer.props.sensitivity}
                    offset={layer.props.offset}
                    fallback={layer.props.fallback}
                    style={{ backgroundSize: backgroundSize }}
                />
            ))}
        </div>
    );
};

export const Layer = ({ imageSet, style, sensitivity = 100, offsetX, offsetY }) => {
    return (
        <div
            className={styles.layer}
            data-sensitivity={sensitivity}
            style={{
                ...style,
                backgroundImage: `image-set(${imageSet})`,
                backgroundPositionX: '50%',
                backgroundPositionY: '50%'
            }}
        ></div>
    );
};
