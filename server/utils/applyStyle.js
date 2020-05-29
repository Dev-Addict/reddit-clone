const getApplyStyle = style => {
    const css = require(style);
    return (selectors, style = {}) => {
        let className = "";

        for (const key in selectors) {
            const selector = selectors[key];
            const rules = css[selector];
            if (rules) {
                const styles = rules.split(";");
                for (const key_ in styles) {
                    const [attribute, value] = styles[key_].split(":");
                    const attr = attribute.replace(/-([a-z])/g, g => g[1].toUpperCase());
                    style[attr.trim()] = value.trim();
                }
            }

            className += ` ${selector.substr(1)}`;
        }

        return {
            style,
            className,
        };
    };
};

export default getApplyStyle;