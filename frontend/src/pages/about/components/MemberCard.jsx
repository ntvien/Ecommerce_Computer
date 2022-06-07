import React from "react";

export default function MemberCard({ image_url, name, position, url_fb, url_linkedin, url_github }) {
  return (
    <div class="bg-white rounded shadow-sm py-5 px-4 row justify-content-center">
      <img
        src={image_url}
        alt=""
        width="170"
        height="170"
        class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm col-9"
      />
      <h5 class="mb-0 text-center">{name}</h5>
      <span class="small text-uppercase text-muted col-12 text-center">{position}</span>
      <ul class="social mb-0 list-inline mt-3 row justify-content-center col-12">
        <li class="list-inline-item col-1" >
          <a href={url_fb} class="social-link">
            <i class="fa fa-facebook"></i>
          </a>
        </li>
        <li class="list-inline-item col-1">
          <a href={url_linkedin} class="social-link">
            <i class="fa fa-linkedin"></i>
          </a>
        </li>
        <li class="list-inline-item col-1">
          <a href={url_github} class="social-link">
            <i class="fa fa-github"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
