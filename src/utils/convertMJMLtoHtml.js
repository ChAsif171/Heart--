import mustache from "mustache";
import mjml from "mjml";

const ConvertMJMLToHTML = (mjmlDocument, templateData = { user: "John" }) => {
    const renderedMJML = mustache.render(mjmlDocument, templateData);
    const { html } = mjml(renderedMJML);
    return html;
};

export default ConvertMJMLToHTML;
