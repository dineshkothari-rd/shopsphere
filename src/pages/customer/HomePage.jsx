import Container from "@/components/shared/Container";
import { auth } from "@/services/firebase/auth";

const HomePage = () => {
  console.log({ auth });
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Modern Ecommerce Platform
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Build scalable ecommerce experiences with modern UI, smart
            filtering, and seamless order management.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
