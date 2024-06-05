import MaxWidthWrapper from "./MaxWidthWrapper";

export const Footer = () => {
  return (
    <footer className="bg-foreground/10">
      <MaxWidthWrapper className="flex min-h-12 w-full items-center justify-center">
        <p className="text-sm text-foreground/80">
          Shoesmart Copyright © 2024
        </p>
      </MaxWidthWrapper>
    </footer>
  );
};
