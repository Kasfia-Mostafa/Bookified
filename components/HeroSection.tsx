import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
     <section className="wrapper mb-10 md:mb-16">
      <div className="library-hero-card">
        <div className="library-hero-content">
          <div className="library-hero-text">
            <h1 className="library-hero-title">Your Library</h1>
            <p className="library-hero-description">
              Discover your next read, keep every favorite organized, and grow
              your personal collection in one warm and cozy place.
            </p>
            <Link href="/books/new" className="library-cta-primary">
              <Plus className="icon-sm" aria-hidden="true" />
              Add New Book
            </Link>
          </div>

          <div className="library-hero-illustration">
            <Image
              src={heroIllustration}
              alt="Vintage books and a globe"
              className="h-auto w-full max-w-70"
              priority
            />
          </div>

          <div className="library-hero-illustration-desktop">
            <Image
              src={heroIllustration}
              alt="Vintage books and a globe"
              className="h-auto w-full max-w-92.5"
              priority
            />
          </div>

          <div className="library-steps-card z-10 w-full max-w-70 space-y-3 lg:w-70">
            <div className="library-step-item">
              <span className="library-step-number">1</span>
              <div>
                <p className="library-step-title">Add your books</p>
                <p className="library-step-description">
                  Create your shelf with titles you love.
                </p>
              </div>
            </div>

            <div className="library-step-item">
              <span className="library-step-number">2</span>
              <div>
                <p className="library-step-title">Track your reading</p>
                <p className="library-step-description">
                  Keep notes and progress for every book.
                </p>
              </div>
            </div>

            <div className="library-step-item">
              <span className="library-step-number">3</span>
              <div>
                <p className="library-step-title">Find your next favorite</p>
                <p className="library-step-description">
                  Browse recommendations in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
