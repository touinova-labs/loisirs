import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";


export const MagicLinkEmail = ({ magicLink }: { magicLink: string }) => (
  <Html>
    <Head />
    <Preview>Votre accès privilégié aux enchères Loisirs Privé 🔑</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Heading style={logo}>L/P</Heading>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Bienvenue au Club</Heading>

          <Text style={text}>
            Votre demande d'accès sécurisé a été validée. 
            Découvrez dès maintenant nos **enchères de prestige** et nos 
            **ventes privées** sélectionnées pour vous.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={magicLink}>
              Entrer dans le Club
            </Button>
          </Section>

          <Text style={details}>
            Hôtels d'exception • Gastronomie • Évasions sur-mesure
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            © {new Date().getFullYear()} **Loisirs Privé**. L'art de l'enchère haut de gamme.
          </Text>
          <Text style={footerAddress}>
            Ce lien est à usage unique et expire dans 15 minutes. 
            Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles mis à jour pour un rendu "Premium"
const main = {
  backgroundColor: "#f9fafb", // Gris très clair pour le fond d'écran
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  width: "560px",
  backgroundColor: "#ffffff", // Fond blanc pour le contenu (très propre)
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  overflow: "hidden" as const,
};

const logoSection = {
  backgroundColor: "#0f172a", // Bleu/Noir profond pour le bandeau logo
  padding: "30px",
  textAlign: "center" as const,
};

const logo = {
  color: "#fbbf24", // Ambre/Or
  fontSize: "28px",
  fontWeight: "bold",
  letterSpacing: "5px",
  margin: "0",
};

const content = {
  padding: "40px 50px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 20px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 30px",
};

const buttonContainer = {
  margin: "30px 0",
};

const button = {
  backgroundColor: "#0f172a", // Bouton sombre pour le contraste "Luxe"
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "16px 0",
};

const details = {
  color: "#9ca3af",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  marginTop: "24px",
};

const footer = {
  padding: "0 50px 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#374151",
  fontSize: "13px",
  fontWeight: "600",
  margin: "0 0 8px",
};

const footerAddress = {
  color: "#9ca3af",
  fontSize: "11px",
  lineHeight: "16px",
  margin: "0",
};