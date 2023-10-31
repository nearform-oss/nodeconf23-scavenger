import clsx from 'clsx';
import {ParallaxLayer, Parallax, type IParallax} from '@react-spring/parallax';
import {Suspense, lazy, useEffect, useRef, useState} from 'react';
import usePieceRefs from './use-piece-refs';
import logoNodeConf from './assets/nc-logo.svg';
import NearFormLove from './NearFormLove';
import Inventory from './Inventory';
import {type CubeLayout} from './use-cube-layout';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const RotatingPieces3D = lazy(async () => import('./RotatingPieces3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));

export default function HelpPage({
  onClose,
  cubeLayout,
}: {
  onClose: () => void;
  cubeLayout: CubeLayout;
}) {
  const parallaxRef = useRef<IParallax>(null);
  const [showClose, setShowClose] = useState(false);
  const pieceRefs = usePieceRefs();
  const cubeRef = useRef<HTMLDivElement>(null!);
  const [firstCube, setFirstCube] = useState(true);

  useEffect(() => {
    function handleScroll() {
      if (parallaxRef.current) {
        // Console.log(parallaxRef.current.current);
        if (parallaxRef.current.current / parallaxRef.current.space > 6) {
          setShowClose(true);
        } else {
          setShowClose(false);
        }

        setFirstCube(
          parallaxRef.current.current / parallaxRef.current.space < 4,
        );
      }
    }

    const current = parallaxRef.current?.container?.current as
      | HTMLDivElement
      | undefined;

    current?.addEventListener('scroll', handleScroll);

    return () => {
      current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="absolute w-screen overflow-hidden top-0 left-0 h-[100dvh] help-bg-0">
      <Parallax ref={parallaxRef} config={{}} pages={8} className="">
        <ParallaxLayer className="help-bg-1" offset={3} speed={1} />
        <ParallaxLayer className="help-bg-2" offset={5} speed={1} />
        <ParallaxLayer className="help-bg-3" offset={7} speed={1} />
        <ParallaxLayer sticky={{start: 0, end: 2}}>
          <div className="justify-start w-full h-100dvh mt--20%">
            <div
              ref={firstCube ? cubeRef : null}
              className="w-125% aspect-square"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer sticky={{start: 0, end: 1.5}} className="justify-center">
          <div className="items-center justify-end self-center gap-2 text-center h-100dvh px-3 pb-66">
            <div className="text-xl font-bold">Welcome to Puzzlr!</div>
            <div className="text-xl">The Ultimate Cube-Building Challenge!</div>
            <div className="font-bold">Want a chance to win x,y, or z?</div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer sticky={{start: 0, end: 0.5}} speed={1}>
          <div className="h-100dvh justify-end text-center px-3 pb-50">
            <div className="">
              Your mission is simple: collect puzzle pieces and construct your
              very own unique cube.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer sticky={{start: 0.5, end: 1.5}}>
          <div className="h-100dvh justify-end text-center px-3 pb-36 gap-3">
            <div className="">
              But act fast - you need to be one of the first 10 people to show
              your completed cube at the NearForm booth to collect your prize.
            </div>
            <div>Learn how it all comes together...</div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={1}
          sticky={{start: 3, end: 4}}
          className="justify-center"
        >
          <div className="w-50% self-start">
            <Inventory pieceRefs={pieceRefs} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0} className="mix-blend-difference">
          <div className="help-container-right">
            <div className="gap-2 items-start">
              <div className="i-tabler-puzzle help-icon ml--2" />
              <div className="help-header">Find QR Codes</div>
            </div>
            <div>
              Keep your eyes peeled for QR codes on people and posters
              throughout the venue. Scanning these codes will magically add
              puzzle pieces to your inventory.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0} className="mix-blend-difference">
          <div className="help-container-right">
            <div className="gap-2 items-start">
              <div className="i-tabler-shape help-icon ml--2" />
              <div className="help-header">Five Unique Shapes</div>
            </div>
            <div>
              There are five distinct shapes of puzzle pieces waiting to be
              collected. With infinite possibilities, you&apos;ll create a cube
              that&apos;s truly your own. Click on pieces in your inventory to
              add them to the cube.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={1}>
          <div className="help-container self-end w-100% mr--25%">
            <div
              ref={firstCube ? null : cubeRef}
              className="w-full max-w-[min(100vh,calc(100vw_*_0.75))] aspect-square"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={0} className="mix-blend-difference">
          <div className="help-container-left">
            <div className="gap-2 items-end">
              <div className="i-tabler-crane help-icon" />
              <div className="help-header">Building Your Cube</div>
            </div>

            <div>
              The ultimate goal? Craft your cube, layer by layer, using multiple
              pieces of various shapes. The challenge lies in assembling it just
              right.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={6} speed={1}>
          <div className="help-container-left">
            <NearFormLove vertical />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={6} className="mix-blend-difference">
          <div className="help-container-right">
            <div className="gap-2 items-start">
              <div className="i-tabler-brand-x help-icon ml--2" />
              <div className="help-header">Share Your Success</div>
            </div>
            <div className="gap-3">
              <div className="inline">
                Once your cube is complete, shout it out to the world! Tweet a
                screenshot of your masterpiece to{' '}
                <a
                  className="underline font-semibold"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    'I just completed my Puzzlr cube challenge by @NearForm at @NodeConfEU',
                  )}`}
                >
                  @NearForm
                </a>
                .
              </div>
              <div>
                Exciting prizes await the first 10 people that show their cube
                at the NearForm booth.
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={7} speed={1}>
          <div className="help-container-right p-4 items-center">
            <img src={logoNodeConf} className="max-w-60 w-full" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={7}
          className="mix-blend-difference"
          onClick={() => {
            onClose();
          }}
        >
          <div className="help-container-left">
            <div className="gap-2 items-end">
              <div className="i-tabler-sparkles help-icon mr--2" />
              <div className="help-header">Go Farther</div>
            </div>
            <div className="inline">
              Don&apos;t stop at the cube; check out the source code on{' '}
              <a
                className="underline font-semibold"
                href="https://github.com/nearform-oss/puzzlr"
              >
                <div className="i-line-md-github-loop h-4 w-4" /> GitHub
              </a>{' '}
              and be sure to sign up for the{' '}
              <a
                className="underline font-semibold"
                href="https://www.nearform.com/newsletter/"
              >
                NearForm newsletter
              </a>
              .
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
      <div
        className={clsx(
          'absolute bottom-0 animate-bounce transition-opacity ease-out duration-800 pointer-events-none mix-blend-difference',
          showClose ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="i-tabler-chevron-compact-down w-24 h-24" />
      </div>
      <div
        className={clsx(
          'absolute bottom-0 transition-opacity ease-out duration-800 pointer-events-none pb-1 mix-blend-difference',
          showClose ? 'animate-wobble opacity-100' : 'opacity-0',
        )}
      >
        <div className="w-16 h-16 i-tabler-square-rounded-check" />
        <div className="w-16 text-center text-sm">click anywhere to close</div>
      </div>
      <div className="absolute top-0 left-0">
        <Suspense>
          <Canvas3D className="pointer-events-none">
            <RotatingPieces3D pieceRefs={pieceRefs} />
          </Canvas3D>
        </Suspense>
      </div>
      <div className="absolute top-0 left-0">
        <Suspense>
          <Canvas3D className="">
            <AssembledCube3D demo cubeRef={cubeRef} {...cubeLayout} />
          </Canvas3D>
        </Suspense>
      </div>
      <a
        className="opensource absolute top-0 flex flex-row items-center justify-center text-xs gap-1 w-full"
        href="https://github.com/nearform-oss/puzzlr"
      >
        <div className="i-logos-nf-logo-horizontal w-21" />
        <div className="mt-1 font-bold">Open Source</div>
        <div className="i-line-md-github-loop h-4 w-4" />
      </a>
    </div>
  );
}
