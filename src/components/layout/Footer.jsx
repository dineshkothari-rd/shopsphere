import Container from "@/components/shared/Container";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/70 bg-card/70 py-10 sm:py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                S
              </span>
              ShopSphere
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Premium ecommerce experience with modern UI, realtime shopping,
              and seamless user interactions.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Shop</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <Link to="/products" className="block hover:text-foreground">
                All Products
              </Link>

              <Link to="/wishlist" className="block hover:text-foreground">
                Wishlist
              </Link>

              <Link to="/orders" className="block hover:text-foreground">
                Orders
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Company</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>About</p>

              <p>Careers</p>

              <p>Support</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Newsletter</h3>

            <p className="text-sm text-muted-foreground">
              Subscribe for latest products and offers.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border/70 pt-6 text-center text-sm text-muted-foreground">
          © 2026 ShopSphere. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
