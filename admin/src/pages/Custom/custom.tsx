import { Button, ButtonGroup, Page } from "@shopify/polaris";

const Custom: React.FC = () =>{
    return (
        <Page fullWidth
        title="Custom Polaris"
        // backAction={{ content: '', url: '/' }}
        subtitle="Perfect for any pet"
        primaryAction={{content: 'Create', url:'/createF',}}
        >
                <ButtonGroup>
      <Button url="/demo">Banner</Button>
      <Button variant="primary" url="/table">Table</Button>
      <Button  url="/re-opener">Re openner</Button>

    </ButtonGroup>
        </Page>
    );
}
export default Custom;