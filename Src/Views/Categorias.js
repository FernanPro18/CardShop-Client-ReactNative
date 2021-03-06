import React from 'react';
import { Card, CardItem, Text, Icon, Content, Right, Left, StyleProvider, Body, Container, Spinner } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import CardsComp from './CardsComp';

const Array = [{ Nombre: 'Amazon', Icon: { Nombre: 'amazon', Tipo: 'FontAwesome' } }, { Nombre: 'GooglePlay', Icon: { Nombre: 'google-play', Tipo: 'Entypo' } }, { Nombre: 'iTunes', Icon: { Nombre: 'itunes', Tipo: 'Zocial' } }, { Nombre: 'PlayStation', Icon: { Nombre: 'logo-playstation', Tipo: 'Ionicons' } }, { Nombre: 'Xbox', Icon: { Nombre: 'xbox', Tipo: 'MaterialCommunityIcons' } }, { Nombre: 'Paypal', Icon: { Nombre: 'paypal', Tipo: 'FontAwesome' } }, { Nombre: 'Steam', Icon: { Nombre: 'steam', Tipo: 'FontAwesome' } }];

export default class Categorias extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Elements: [], Load: false, Categoria: false, Buscar: '', Cards: [], Select: [] }
  }

  async renderCatego() {
    var Elements = [];
    Array.map((Categoria, index) => {
      Elements.push(
        <Card key={index} style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054', flexDirection: 'column', justifyContent: 'center' }}>
          <CardItem button icon onPress={this.Boton.bind(this, Categoria.Nombre)} style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054' }}>
            <Left>
              <Icon name={Categoria.Icon.Nombre} type={Categoria.Icon.Tipo} style={{ color: '#ffff' }} />
            </Left>
            <Body style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              <Text style={{ color: "#ffff" }}>{Categoria.Nombre}</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </CardItem>
        </Card>
      );
    })
    this.setState({ Elements: Elements, Load: true })
  }

  Boton = async (Nombre) => {
    var Select = [];
    if (Nombre === 'Amazon') {
      Select = this.state.Cards[0];
    } else if (Nombre === 'GooglePlay') {
      Select = this.state.Cards[1];
    } else if (Nombre === 'iTunes') {
      Select = this.state.Cards[2];
    } else if (Nombre === 'PlayStation') {
      Select = this.state.Cards[4];
    } else if (Nombre === 'Steam') {
      Select = this.state.Cards[5];
    } else if (Nombre === 'Xbox') {
      Select = this.state.Cards[6];
    } else {
      Select = this.state.Cards[3];
    }
    this.setState({ Categoria: true, Load: false, Select: Select });
  }

  Back = async () => {
    this.setState({ Categoria: false, Load: false, Select: [] })
    this.renderCatego();
  }

  async componentDidMount() {
    this.renderCatego();
    await fetch('https://cards-cardshop.herokuapp.com/Usuarios')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Cards: responseJson, Load: true });
      })
  }

  render() {
    if (this.state.Categoria) {
      return (
        <CardsComp Array={this.state.Select} Back={this.Back} />
      );
    } else {
      return (
        <Container style={{ backgroundColor: '#222b38' }}>
          <StyleProvider style={getTheme(Theme)}>
            <Content padder contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
              {this.state.Load ? this.state.Elements : <Spinner color='red' size='large' />}
            </Content>
          </StyleProvider>
        </Container>
      );
    }
  }
}