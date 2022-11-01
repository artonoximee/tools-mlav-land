import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 50,
    marginTop: 20
  },
  client: {
    marginTop: 30,
    marginLeft: "60%",
    width: "40%"
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: "10%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5",
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  rowTotal: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5",
  },
});

function PDFInvoice(props) {
  const { user, currentUser, invoice, products, total } = props;

  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <PDFViewer className="w-100 mb-5" style={{height: "80vh"}}>
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
          <View style={styles.client}>
            <Text>{ invoice.name }</Text>
            <Text>{ invoice.representative }</Text>
            <Text>{ invoice.address }</Text>
            <Text>{ invoice.postcode }, { invoice.city }</Text>
            <Text>{ invoice.email }</Text>
            <Text>{ invoice.telephone }</Text>
          </View>
          <View style={styles.title}>
            <Text>Facture #{ invoice.id.substring(0,7) }</Text>
            <Text>Date : { invoice.createdAt.substring(8,10) }/{ invoice.createdAt.substring(5,7) }/{ invoice.createdAt.substring(0,4) }</Text>
          </View>
          {
            products.map((product, index) => (
              <View style={styles.row}>
                <Text style={{width: "5%"}}>{ index }</Text>
                <Text style={{width: "50%"}}>{ product.name }</Text>
                <Text style={{width: "20%", textAlign: "right"}}>{ product.quantity }</Text>
                <Text style={{width: "25%", textAlign: "right", paddingRight: 3}}>{ formatter.format(product.price) }</Text>
              </View>
            ))
          }
          <View style={styles.rowTotal}>
            <Text style={{width: "5%"}}></Text>
            <Text style={{width: "50%"}}>Total</Text>
            <Text style={{width: "20%", textAlign: "right"}}></Text>
            <Text style={{width: "25%", textAlign: "right", paddingRight: 3}}>{ formatter.format(total) }</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
};

export default PDFInvoice;