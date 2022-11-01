import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 30
  }
});

function PDFInvoice(props) {
  const { user, currentUser, invoice, products } = props;

  return (
    <PDFViewer className="w-100 h-100 mb-5">
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>{ user.firstName } { user.lastName }</Text>
            <Text>{ user.address }</Text>
            <Text>{ user.postcode }, { user.city }</Text>
            <Text>{ currentUser.email }</Text>
            <Text>{ user.telephone }</Text>
            <Text>N° SIRET : { user.siret }</Text>
          </View>
          <View>
            <Text >{ invoice.name }</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
};

export default PDFInvoice;