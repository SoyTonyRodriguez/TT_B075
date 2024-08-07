import React from 'react';
import promoImage from '../img/ipn-main.webp'; // Import your image here

function MainContent() {
  return (
    <main className="container mx-auto mt-10 px-4 flex">
      <div className="w-2/3">
        <img src={promoImage} alt="Promoción docente" className="w-full h-auto" />
        <h2 className="text-2xl font-bold mt-4">La promoción docente en el instituto Politécnico Nacional</h2>
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo urna sed lacus accumsan, et luctus felis imperdiet.
          Aenean elit dui, hendrerit et blandit pellentesque, ultrices eu eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Suspendisse tempor pretium lacus, eu varius mi tempor eget. Cras placerat arcu libero, in hendrerit turpis porttitor nec.
          Quisque venenatis ultrices semper. Morbi vel condimentum mauris, et dignissim est. Quisque egestas ante a massa imperdiet volutpat.
          Sed pretium tellus at commodo consectetur, sem neque ullamcorper lorem, sit amet auctor nisl enim fermentum mauris.
          Maecenas feugiat mattis vulputate.
        </p>
      </div>
      <aside className="w-1/3 pl-8">
        <div className="bg-gray-200 p-4 mb-4 h-32">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius sapien congue, ultrices lorem in.</p>
        </div>
        <div className="bg-gray-200 p-4 mb-4 h-32">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius sapien congue, ultrices lorem in.</p>
        </div>
        <div className="bg-gray-200 p-4 mb-4 h-32">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo urna sed lacus accumsan.</p>
        </div>
      </aside>
    </main>
  );
}

export default MainContent;
