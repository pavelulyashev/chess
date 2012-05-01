


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>jquery-endless-scroll/js/jquery.endless-scroll.js at master · fredwu/jquery-endless-scroll · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="LXsn6QTS0YLaJgeYEh+SdgkIdz5AN4xALG0XU4FGF4A=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github-2d8bce43bd5f202dc2eff96f5a7591b32745b5fb.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github2-5ab64ac97650d8573ae90dab55d0169f7850d0f9.css" media="screen" rel="stylesheet" type="text/css" />
    

    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/frameworks-7b5694dece50ddf8456fccf7884bd83581722a3f.js" type="text/javascript"></script>
    
    <script defer="defer" src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/github-eb4a341588e7f18b8d5956f819910e529da38472.js" type="text/javascript"></script>
    

      <link rel='permalink' href='/fredwu/jquery-endless-scroll/blob/993832f29ecfac79e4c12ac625504fd9910d7f8f/js/jquery.endless-scroll.js'>
    <meta property="og:title" content="jquery-endless-scroll"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/fredwu/jquery-endless-scroll"/>
    <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-140.png?1334862345"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="jquery-endless-scroll - Endless/infinite scrolling/pagination."/>

    <meta name="description" content="jquery-endless-scroll - Endless/infinite scrolling/pagination." />
  <link href="https://github.com/fredwu/jquery-endless-scroll/commits/master.atom" rel="alternate" title="Recent Commits to jquery-endless-scroll:master" type="application/atom+xml" />

  </head>


  <body class="logged_out page-blob linux vis-public env-production " data-blob-contribs-enabled="yes">
    <div id="wrapper">

    
    
    

      <div id="header" class="true clearfix">
        <div class="container clearfix">
          <a class="site-logo" href="https://github.com">
            <!--[if IE]>
            <img alt="GitHub" class="github-logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7.png?1334862346" />
            <img alt="GitHub" class="github-logo-hover" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7-hover.png?1334862346" />
            <![endif]-->
            <img alt="GitHub" class="github-logo-4x" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x.png?1334862346" />
            <img alt="GitHub" class="github-logo-4x-hover" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x-hover.png?1334862346" />
          </a>

                  <!--
      make sure to use fully qualified URLs here since this nav
      is used on error pages on other domains
    -->
    <ul class="top-nav logged_out">
        <li class="pricing"><a href="https://github.com/plans">Signup and Pricing</a></li>
        <li class="explore"><a href="https://github.com/explore">Explore GitHub</a></li>
      <li class="features"><a href="https://github.com/features">Features</a></li>
        <li class="blog"><a href="https://github.com/blog">Blog</a></li>
      <li class="login"><a href="https://github.com/login?return_to=%2Ffredwu%2Fjquery-endless-scroll%2Fblob%2Fmaster%2Fjs%2Fjquery.endless-scroll.js">Login</a></li>
    </ul>



          
        </div>
      </div>

      

            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="container hentry">
        <div class="pagehead repohead instapaper_ignore readability-menu">
        <div class="title-actions-bar">
          



              <ul class="pagehead-actions">


          <li><a href="/login?return_to=%2Ffredwu%2Fjquery-endless-scroll" class="minibutton btn-watch watch-button entice tooltipped leftwards" rel="nofollow" title="You must be logged in to use this feature"><span><span class="icon"></span>Watch</span></a></li>
          <li><a href="/login?return_to=%2Ffredwu%2Fjquery-endless-scroll" class="minibutton btn-fork fork-button entice tooltipped leftwards" rel="nofollow" title="You must be logged in to use this feature"><span><span class="icon"></span>Fork</span></a></li>


      <li class="repostats">
        <ul class="repo-stats">
          <li class="watchers ">
            <a href="/fredwu/jquery-endless-scroll/watchers" title="Watchers" class="tooltipped downwards">
              349
            </a>
          </li>
          <li class="forks">
            <a href="/fredwu/jquery-endless-scroll/network" title="Forks" class="tooltipped downwards">
              36
            </a>
          </li>
        </ul>
      </li>
    </ul>

          <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title">
            <span class="mini-icon public-repo"></span>
            <span class="author vcard">
<a href="/fredwu" class="url fn" itemprop="url" rel="author">              <span itemprop="title">fredwu</span>
              </a></span> /
            <strong><a href="/fredwu/jquery-endless-scroll" class="js-current-repository">jquery-endless-scroll</a></strong>
          </h1>
        </div>

          

  <ul class="tabs">
    <li><a href="/fredwu/jquery-endless-scroll" class="selected" highlight="repo_sourcerepo_downloadsrepo_commitsrepo_tagsrepo_branches">Code</a></li>
    <li><a href="/fredwu/jquery-endless-scroll/network" highlight="repo_network">Network</a>
    <li><a href="/fredwu/jquery-endless-scroll/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>0</span></a></li>

      <li><a href="/fredwu/jquery-endless-scroll/issues" highlight="repo_issues">Issues <span class='counter'>1</span></a></li>


    <li><a href="/fredwu/jquery-endless-scroll/graphs" highlight="repo_graphsrepo_contributors">Graphs</a></li>

  </ul>
 
<div class="frame frame-center tree-finder" style="display:none"
      data-tree-list-url="/fredwu/jquery-endless-scroll/tree-list/993832f29ecfac79e4c12ac625504fd9910d7f8f"
      data-blob-url-prefix="/fredwu/jquery-endless-scroll/blob/993832f29ecfac79e4c12ac625504fd9910d7f8f"
    >

  <div class="breadcrumb">
    <span class="bold"><a href="/fredwu/jquery-endless-scroll">jquery-endless-scroll</a></span> /
    <input class="tree-finder-input js-navigation-enable" type="text" name="query" autocomplete="off" spellcheck="false">
  </div>

    <div class="octotip">
      <p>
        <a href="/fredwu/jquery-endless-scroll/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever" rel="nofollow">Dismiss</a>
        <span class="bold">Octotip:</span> You've activated the <em>file finder</em>
        by pressing <span class="kbd">t</span> Start typing to filter the
        file list. Use <span class="kbd badmono">↑</span> and
        <span class="kbd badmono">↓</span> to navigate,
        <span class="kbd">enter</span> to view files.
      </p>
    </div>

  <table class="tree-browser" cellpadding="0" cellspacing="0">
    <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
    <tr class="js-no-results no-results" style="display: none">
      <th colspan="2">No matching files</th>
    </tr>
    <tbody class="js-results-list js-navigation-container">
    </tbody>
  </table>
</div>

<div id="jump-to-line" style="display:none">
  <h2>Jump to Line</h2>
  <form accept-charset="UTF-8">
    <input name="utf8" type="hidden" value="&#x2713;" />
    <input class="textfield" type="text">
    <div class="full-button">
      <button type="submit" class="classy">
        <span>Go</span>
      </button>
    </div>
  </form>
</div>


<div class="subnav-bar">

  <ul class="actions subnav">
    <li><a href="/fredwu/jquery-endless-scroll/tags" class="" highlight="repo_tags">Tags <span class="counter">18</span></a></li>
    <li><a href="/fredwu/jquery-endless-scroll/downloads" class="blank downloads-blank" highlight="repo_downloads">Downloads <span class="counter">0</span></a></li>
    
  </ul>

  <ul class="scope">
    <li class="switcher">

      <div class="context-menu-container js-menu-container">
        <a href="#"
           class="minibutton bigger switcher js-menu-target js-commitish-button btn-branch repo-tree"
           data-master-branch="master"
           data-ref="master">
          <span><span class="icon"></span><i>branch:</i> master</span>
        </a>

        <div class="context-pane commitish-context js-menu-content">
          <a href="javascript:;" class="close js-menu-close"></a>
          <div class="context-title">Switch Branches/Tags</div>
          <div class="context-body pane-selector commitish-selector js-filterable-commitishes">
            <div class="filterbar">
              <input type="text" id="context-commitish-filter-field" class="commitish-filter" placeholder="Filter branches/tags" />

              <ul class="tabs">
                <li><a href="#" data-filter="branches" class="selected">Branches</a></li>
                <li><a href="#" data-filter="tags">Tags</a></li>
              </ul>
            </div>

              <div class="commitish-item branch-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/gh-pages/js/jquery.endless-scroll.js" data-name="gh-pages" rel="nofollow">gh-pages</a>
                </h4>
              </div>
              <div class="commitish-item branch-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/master/js/jquery.endless-scroll.js" data-name="master" rel="nofollow">master</a>
                </h4>
              </div>

              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.8.0/js/jquery.endless-scroll.js" data-name="1.8.0" rel="nofollow">1.8.0</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.7.1/js/jquery.endless-scroll.js" data-name="1.7.1" rel="nofollow">1.7.1</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.7.0/js/jquery.endless-scroll.js" data-name="1.7.0" rel="nofollow">1.7.0</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.6.0/js/jquery.endless-scroll.js" data-name="1.6.0" rel="nofollow">1.6.0</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.5.1/js/jquery.endless-scroll.js" data-name="1.5.1" rel="nofollow">1.5.1</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.5.0/js/jquery.endless-scroll.js" data-name="1.5.0" rel="nofollow">1.5.0</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.8/js/jquery.endless-scroll.js" data-name="1.4.8" rel="nofollow">1.4.8</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.7/js/jquery.endless-scroll.js" data-name="1.4.7" rel="nofollow">1.4.7</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.6/js/jquery.endless-scroll.js" data-name="1.4.6" rel="nofollow">1.4.6</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.5/js/jquery.endless-scroll.js" data-name="1.4.5" rel="nofollow">1.4.5</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.4/js/jquery.endless-scroll.js" data-name="1.4.4" rel="nofollow">1.4.4</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.3/js/jquery.endless-scroll.js" data-name="1.4.3" rel="nofollow">1.4.3</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.2/js/jquery.endless-scroll.js" data-name="1.4.2" rel="nofollow">1.4.2</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4.1/js/jquery.endless-scroll.js" data-name="1.4.1" rel="nofollow">1.4.1</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.4/js/jquery.endless-scroll.js" data-name="1.4" rel="nofollow">1.4</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.3/js/jquery.endless-scroll.js" data-name="1.3" rel="nofollow">1.3</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.2/js/jquery.endless-scroll.js" data-name="1.2" rel="nofollow">1.2</a>
                </h4>
              </div>
              <div class="commitish-item tag-commitish selector-item">
                <h4>
                    <a href="/fredwu/jquery-endless-scroll/blob/1.1/js/jquery.endless-scroll.js" data-name="1.1" rel="nofollow">1.1</a>
                </h4>
              </div>

            <div class="no-results" style="display:none">Nothing to show</div>
          </div>
        </div><!-- /.commitish-context-context -->
      </div>

    </li>
  </ul>

  <ul class="subnav with-scope">

    <li><a href="/fredwu/jquery-endless-scroll" class="selected" highlight="repo_source">Files</a></li>
    <li><a href="/fredwu/jquery-endless-scroll/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/fredwu/jquery-endless-scroll/branches" class="" highlight="repo_branches" rel="nofollow">Branches <span class="counter">2</span></a></li>
  </ul>

</div>

  
  
  


          

        </div><!-- /.repohead -->

        





<!-- block_view_fragment_key: views7/v8/blob:v21:9be013307219c9e4003090f90cba13d5 -->
  <div id="slider">

    <div class="breadcrumb" data-path="js/jquery.endless-scroll.js/">
      <b itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/fredwu/jquery-endless-scroll/tree/93684ddfe682a3b11dde8d042542563a27f5391a" class="js-rewrite-sha" itemprop="url"><span itemprop="title">jquery-endless-scroll</span></a></b> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/fredwu/jquery-endless-scroll/tree/93684ddfe682a3b11dde8d042542563a27f5391a/js" class="js-rewrite-sha" itemscope="url"><span itemprop="title">js</span></a></span> / <strong class="final-path">jquery.endless-scroll.js</strong> <span class="js-clippy mini-icon clippy " data-clipboard-text="js/jquery.endless-scroll.js" data-copied-hint="copied!" data-copy-hint="copy to clipboard"></span>
    </div>


      <div class="commit file-history-tease" data-path="js/jquery.endless-scroll.js/">
        <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/2735068c913a072744a799e3c0833b7b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
        <span class="author"><a href="/fredwu">fredwu</a></span>
        <time class="js-relative-date" datetime="2012-04-17T04:00:10-07:00" title="2012-04-17 04:00:10">April 17, 2012</time>
        <div class="commit-title">
            <a href="/fredwu/jquery-endless-scroll/commit/93684ddfe682a3b11dde8d042542563a27f5391a" class="message">Bumped version to 1.8.0</a>
        </div>

        <div class="participation">
          <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>6</strong> contributors</a></p>
              <a class="avatar tooltipped downwards" title="fredwu" href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js?author=fredwu"><img height="20" src="https://secure.gravatar.com/avatar/2735068c913a072744a799e3c0833b7b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="ccoloma" href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js?author=ccoloma"><img height="20" src="https://secure.gravatar.com/avatar/af497fe0e8f2f1de8c521ebefb3f526b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="jonstorer" href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js?author=jonstorer"><img height="20" src="https://secure.gravatar.com/avatar/d4779f3551581ae2d474c62197872188?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="drdla" href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js?author=drdla"><img height="20" src="https://secure.gravatar.com/avatar/27a5c7324c3fad66fe64e18e2d1563aa?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="stijink" href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js?author=stijink"><img height="20" src="https://secure.gravatar.com/avatar/1fa410a2f82dc0bb784b856e7fb0e1ea?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="RussTheAerialist" href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js?author=RussTheAerialist"><img height="20" src="https://secure.gravatar.com/avatar/42dea51005f1cf878cef271c8dffdae6?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>


        </div>
        <div id="blob_contributors_box" style="display:none">
          <h2>Users on GitHub who have contributed to this file</h2>
          <ul class="facebox-user-list">
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/2735068c913a072744a799e3c0833b7b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/fredwu">fredwu</a>
            </li>
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/af497fe0e8f2f1de8c521ebefb3f526b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/ccoloma">ccoloma</a>
            </li>
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/d4779f3551581ae2d474c62197872188?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/jonstorer">jonstorer</a>
            </li>
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/27a5c7324c3fad66fe64e18e2d1563aa?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/drdla">drdla</a>
            </li>
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/1fa410a2f82dc0bb784b856e7fb0e1ea?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/stijink">stijink</a>
            </li>
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/42dea51005f1cf878cef271c8dffdae6?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/RussTheAerialist">RussTheAerialist</a>
            </li>
          </ul>
        </div>
      </div>

    <div class="frames">
      <div class="frame frame-center" data-path="js/jquery.endless-scroll.js/" data-permalink-url="/fredwu/jquery-endless-scroll/blob/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js" data-title="jquery-endless-scroll/js/jquery.endless-scroll.js at 93684ddfe682a3b11dde8d042542563a27f5391a · fredwu/jquery-endless-scroll · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="mini-icon text-file"></b></span>
                <span class="mode" title="File Mode">100644</span>
                  <span>344 lines (305 sloc)</span>
                <span>12.49 kb</span>
              </div>
              <ul class="button-group actions">
                  <li>
                    <a class="grouped-button file-edit-link minibutton bigger lighter js-rewrite-sha" href="/fredwu/jquery-endless-scroll/edit/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js" data-method="post" rel="nofollow"><span>Edit this file</span></a>
                  </li>

                <li>
                  <a href="/fredwu/jquery-endless-scroll/raw/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js" class="minibutton btn-raw grouped-button bigger lighter" id="raw-url"><span><span class="icon"></span>Raw</span></a>
                </li>
                  <li>
                    <a href="/fredwu/jquery-endless-scroll/blame/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js" class="minibutton btn-blame grouped-button bigger lighter"><span><span class="icon"></span>Blame</span></a>
                  </li>
                <li>
                  <a href="/fredwu/jquery-endless-scroll/commits/93684ddfe682a3b11dde8d042542563a27f5391a/js/jquery.endless-scroll.js" class="minibutton btn-history grouped-button bigger lighter" rel="nofollow"><span><span class="icon"></span>History</span></a>
                </li>
              </ul>
            </div>
              <div class="data type-javascript">
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
</pre>
          </td>
          <td width="100%">
                <div class="highlight"><pre><div class='line' id='LC1'>// Generated by CoffeeScript 1.3.1</div><div class='line' id='LC2'>/*</div><div class='line' id='LC3'>&nbsp;&nbsp;Endless Scroll plugin for jQuery</div><div class='line' id='LC4'><br/></div><div class='line' id='LC5'>&nbsp;&nbsp;v1.8.0</div><div class='line' id='LC6'><br/></div><div class='line' id='LC7'>&nbsp;&nbsp;Copyright (c) 2008-2012 Fred Wu</div><div class='line' id='LC8'><br/></div><div class='line' id='LC9'>&nbsp;&nbsp;Dual licensed under the MIT and GPL licenses:</div><div class='line' id='LC10'>&nbsp;&nbsp;&nbsp;&nbsp;http://www.opensource.org/licenses/mit-license.php</div><div class='line' id='LC11'>&nbsp;&nbsp;&nbsp;&nbsp;http://www.gnu.org/licenses/gpl.html</div><div class='line' id='LC12'>*/</div><div class='line' id='LC13'><br/></div><div class='line' id='LC14'>/*</div><div class='line' id='LC15'>&nbsp;&nbsp;Usage:</div><div class='line' id='LC16'><br/></div><div class='line' id='LC17'>&nbsp;&nbsp;// using default options</div><div class='line' id='LC18'>&nbsp;&nbsp;$(window).endlessScroll();</div><div class='line' id='LC19'><br/></div><div class='line' id='LC20'>&nbsp;&nbsp;// using some custom options</div><div class='line' id='LC21'>&nbsp;&nbsp;$(&quot;#images&quot;).endlessScroll({</div><div class='line' id='LC22'>&nbsp;&nbsp;&nbsp;&nbsp;fireOnce: false,</div><div class='line' id='LC23'>&nbsp;&nbsp;&nbsp;&nbsp;fireDelay: false,</div><div class='line' id='LC24'>&nbsp;&nbsp;&nbsp;&nbsp;loader: '&lt;div class=&quot;loading&quot;&gt;&lt;div&gt;',</div><div class='line' id='LC25'>&nbsp;&nbsp;&nbsp;&nbsp;callback: function(){</div><div class='line' id='LC26'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alert('test');</div><div class='line' id='LC27'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC28'>&nbsp;&nbsp;});</div><div class='line' id='LC29'><br/></div><div class='line' id='LC30'>&nbsp;&nbsp;Configuration options:</div><div class='line' id='LC31'><br/></div><div class='line' id='LC32'>&nbsp;&nbsp;pagesToKeep       integer         the number of 'pages' to keep before either end of the scrolling content are discarded,</div><div class='line' id='LC33'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by default (value set to `null`) no content will be discarded</div><div class='line' id='LC34'>&nbsp;&nbsp;inflowPixels      integer         the number of pixels from the boundary of the element that triggers the event</div><div class='line' id='LC35'>&nbsp;&nbsp;fireOnce          boolean         only fire once until the execution of the current event is completed</div><div class='line' id='LC36'>&nbsp;&nbsp;fireDelay         integer         delay the subsequent firing, in milliseconds, 0 or false to disable delay</div><div class='line' id='LC37'>&nbsp;&nbsp;loader            string          the HTML to be displayed during loading</div><div class='line' id='LC38'>&nbsp;&nbsp;content           string|function Plain HTML content to insert after each call, can be either a string or a function</div><div class='line' id='LC39'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that returns a string, when passed as a function it accepts three arguments:</div><div class='line' id='LC40'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fireSequence&gt; the number of times the event triggered during the current page session</div><div class='line' id='LC41'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;pageSequence&gt; a positive or negative value that represents the scroll direction sequence</div><div class='line' id='LC42'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;scrollDirection&gt; a string of either 'prev' or 'next'</div><div class='line' id='LC43'>&nbsp;&nbsp;insertBefore      string          jQuery selector syntax: where to put the loader as well as the plain HTML data</div><div class='line' id='LC44'>&nbsp;&nbsp;insertAfter       string          jQuery selector syntax: where to put the loader as well as the plain HTML data</div><div class='line' id='LC45'>&nbsp;&nbsp;intervalFrequency integer         set the frequency of the scroll event checking, the larger the frequency number,</div><div class='line' id='LC46'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the less memory it consumes - but also the less sensitive the event trigger becomes</div><div class='line' id='LC47'>&nbsp;&nbsp;ceaseFireOnEmpty  boolean         ceases fire automatically when the content is empty, set it to `false` if you are using</div><div class='line' id='LC48'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`callback` instead of `content` for loading content</div><div class='line' id='LC49'>&nbsp;&nbsp;resetCounter      function        resets the fire sequence counter if the function returns true, this function</div><div class='line' id='LC50'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;could also perform hook actions since it is applied at the start of the event</div><div class='line' id='LC51'>&nbsp;&nbsp;callback          function        callback function, accepts three arguments:</div><div class='line' id='LC52'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fireSequence&gt; the number of times the event triggered during the current page session</div><div class='line' id='LC53'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;pageSequence&gt; a positive or negative value that represents the scroll direction sequence</div><div class='line' id='LC54'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;scrollDirection&gt; a string of either 'prev' or 'next'</div><div class='line' id='LC55'>&nbsp;&nbsp;ceaseFire         function        stops the event (no more endless scrolling) if the function returns true,</div><div class='line' id='LC56'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accepts three arguments:</div><div class='line' id='LC57'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fireSequence&gt; the number of times the event triggered during the current page session</div><div class='line' id='LC58'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;pageSequence&gt; a positive or negative value that represents the scroll direction sequence</div><div class='line' id='LC59'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;scrollDirection&gt; a string of either 'prev' or 'next'</div><div class='line' id='LC60'>*/</div><div class='line' id='LC61'><br/></div><div class='line' id='LC62'>var EndlessScroll;</div><div class='line' id='LC63'><br/></div><div class='line' id='LC64'>EndlessScroll = (function() {</div><div class='line' id='LC65'>&nbsp;&nbsp;var defaults;</div><div class='line' id='LC66'><br/></div><div class='line' id='LC67'>&nbsp;&nbsp;EndlessScroll.name = 'EndlessScroll';</div><div class='line' id='LC68'><br/></div><div class='line' id='LC69'>&nbsp;&nbsp;defaults = {</div><div class='line' id='LC70'>&nbsp;&nbsp;&nbsp;&nbsp;pagesToKeep: null,</div><div class='line' id='LC71'>&nbsp;&nbsp;&nbsp;&nbsp;inflowPixels: 50,</div><div class='line' id='LC72'>&nbsp;&nbsp;&nbsp;&nbsp;fireOnce: true,</div><div class='line' id='LC73'>&nbsp;&nbsp;&nbsp;&nbsp;fireDelay: 150,</div><div class='line' id='LC74'>&nbsp;&nbsp;&nbsp;&nbsp;loader: 'Loading...',</div><div class='line' id='LC75'>&nbsp;&nbsp;&nbsp;&nbsp;content: '',</div><div class='line' id='LC76'>&nbsp;&nbsp;&nbsp;&nbsp;insertBefore: null,</div><div class='line' id='LC77'>&nbsp;&nbsp;&nbsp;&nbsp;insertAfter: null,</div><div class='line' id='LC78'>&nbsp;&nbsp;&nbsp;&nbsp;intervalFrequency: 250,</div><div class='line' id='LC79'>&nbsp;&nbsp;&nbsp;&nbsp;ceaseFireOnEmpty: true,</div><div class='line' id='LC80'>&nbsp;&nbsp;&nbsp;&nbsp;resetCounter: function() {</div><div class='line' id='LC81'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return false;</div><div class='line' id='LC82'>&nbsp;&nbsp;&nbsp;&nbsp;},</div><div class='line' id='LC83'>&nbsp;&nbsp;&nbsp;&nbsp;callback: function() {</div><div class='line' id='LC84'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return true;</div><div class='line' id='LC85'>&nbsp;&nbsp;&nbsp;&nbsp;},</div><div class='line' id='LC86'>&nbsp;&nbsp;&nbsp;&nbsp;ceaseFire: function() {</div><div class='line' id='LC87'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return false;</div><div class='line' id='LC88'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC89'>&nbsp;&nbsp;};</div><div class='line' id='LC90'><br/></div><div class='line' id='LC91'>&nbsp;&nbsp;function EndlessScroll(scope, options) {</div><div class='line' id='LC92'>&nbsp;&nbsp;&nbsp;&nbsp;var _this = this;</div><div class='line' id='LC93'>&nbsp;&nbsp;&nbsp;&nbsp;this.options = $.extend({}, defaults, options);</div><div class='line' id='LC94'>&nbsp;&nbsp;&nbsp;&nbsp;this.pagesStack = [0];</div><div class='line' id='LC95'>&nbsp;&nbsp;&nbsp;&nbsp;this.scrollDirection = 'next';</div><div class='line' id='LC96'>&nbsp;&nbsp;&nbsp;&nbsp;this.firing = true;</div><div class='line' id='LC97'>&nbsp;&nbsp;&nbsp;&nbsp;this.fired = false;</div><div class='line' id='LC98'>&nbsp;&nbsp;&nbsp;&nbsp;this.fireSequence = 0;</div><div class='line' id='LC99'>&nbsp;&nbsp;&nbsp;&nbsp;this.pageSequence = 0;</div><div class='line' id='LC100'>&nbsp;&nbsp;&nbsp;&nbsp;this.nextSequence = 1;</div><div class='line' id='LC101'>&nbsp;&nbsp;&nbsp;&nbsp;this.prevSequence = -1;</div><div class='line' id='LC102'>&nbsp;&nbsp;&nbsp;&nbsp;this.lastScrollTop = 0;</div><div class='line' id='LC103'>&nbsp;&nbsp;&nbsp;&nbsp;this.insertLocation = this.options.insertAfter;</div><div class='line' id='LC104'>&nbsp;&nbsp;&nbsp;&nbsp;this.didScroll = false;</div><div class='line' id='LC105'>&nbsp;&nbsp;&nbsp;&nbsp;this.isScrollable = true;</div><div class='line' id='LC106'>&nbsp;&nbsp;&nbsp;&nbsp;this.target = scope;</div><div class='line' id='LC107'>&nbsp;&nbsp;&nbsp;&nbsp;this.targetId = '';</div><div class='line' id='LC108'>&nbsp;&nbsp;&nbsp;&nbsp;this.content = '';</div><div class='line' id='LC109'>&nbsp;&nbsp;&nbsp;&nbsp;this.lastContent = 'dummy';</div><div class='line' id='LC110'>&nbsp;&nbsp;&nbsp;&nbsp;this.innerWrap = $('.endless_scroll_inner_wrap', this.target);</div><div class='line' id='LC111'>&nbsp;&nbsp;&nbsp;&nbsp;this.handleDeprecatedOptions();</div><div class='line' id='LC112'>&nbsp;&nbsp;&nbsp;&nbsp;this.setInsertPositionsWhenNecessary();</div><div class='line' id='LC113'>&nbsp;&nbsp;&nbsp;&nbsp;$(scope).scroll(function() {</div><div class='line' id='LC114'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.detectTarget(scope);</div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return _this.detectScrollDirection();</div><div class='line' id='LC116'>&nbsp;&nbsp;&nbsp;&nbsp;});</div><div class='line' id='LC117'>&nbsp;&nbsp;}</div><div class='line' id='LC118'><br/></div><div class='line' id='LC119'>&nbsp;&nbsp;EndlessScroll.prototype.run = function() {</div><div class='line' id='LC120'>&nbsp;&nbsp;&nbsp;&nbsp;var _this = this;</div><div class='line' id='LC121'>&nbsp;&nbsp;&nbsp;&nbsp;return setInterval((function() {</div><div class='line' id='LC122'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!_this.shouldTryFiring()) {</div><div class='line' id='LC123'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;</div><div class='line' id='LC124'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC125'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (_this.ceaseFireWhenNecessary()) {</div><div class='line' id='LC126'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;</div><div class='line' id='LC127'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC128'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!_this.shouldBeFiring()) {</div><div class='line' id='LC129'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;</div><div class='line' id='LC130'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC131'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.resetFireSequenceWhenNecessary();</div><div class='line' id='LC132'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.acknowledgeFiring();</div><div class='line' id='LC133'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.insertLoader();</div><div class='line' id='LC134'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (_this.hasContent()) {</div><div class='line' id='LC135'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.showContent();</div><div class='line' id='LC136'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.fireCallback();</div><div class='line' id='LC137'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.cleanUpPagesWhenNecessary();</div><div class='line' id='LC138'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.delayFiringWhenNecessary();</div><div class='line' id='LC139'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC140'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_this.removeLoader();</div><div class='line' id='LC141'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return _this.lastContent = _this.content;</div><div class='line' id='LC142'>&nbsp;&nbsp;&nbsp;&nbsp;}), this.options.intervalFrequency);</div><div class='line' id='LC143'>&nbsp;&nbsp;};</div><div class='line' id='LC144'><br/></div><div class='line' id='LC145'>&nbsp;&nbsp;EndlessScroll.prototype.handleDeprecatedOptions = function() {</div><div class='line' id='LC146'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.options.data) {</div><div class='line' id='LC147'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.options.content = this.options.data;</div><div class='line' id='LC148'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC149'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.options.bottomPixels) {</div><div class='line' id='LC150'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.options.inflowPixels = this.options.bottomPixels;</div><div class='line' id='LC151'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC152'>&nbsp;&nbsp;};</div><div class='line' id='LC153'><br/></div><div class='line' id='LC154'>&nbsp;&nbsp;EndlessScroll.prototype.setInsertPositionsWhenNecessary = function() {</div><div class='line' id='LC155'>&nbsp;&nbsp;&nbsp;&nbsp;var container;</div><div class='line' id='LC156'>&nbsp;&nbsp;&nbsp;&nbsp;container = &quot;&quot; + this.target.selector + &quot; div.endless_scroll_inner_wrap&quot;;</div><div class='line' id='LC157'>&nbsp;&nbsp;&nbsp;&nbsp;if (defaults.insertBefore === null) {</div><div class='line' id='LC158'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.options.insertBefore = &quot;&quot; + container + &quot; div:first&quot;;</div><div class='line' id='LC159'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC160'>&nbsp;&nbsp;&nbsp;&nbsp;if (defaults.insertAfter === null) {</div><div class='line' id='LC161'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.options.insertAfter = &quot;&quot; + container + &quot; div:last&quot;;</div><div class='line' id='LC162'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC163'>&nbsp;&nbsp;};</div><div class='line' id='LC164'><br/></div><div class='line' id='LC165'>&nbsp;&nbsp;EndlessScroll.prototype.detectTarget = function(scope) {</div><div class='line' id='LC166'>&nbsp;&nbsp;&nbsp;&nbsp;this.target = scope;</div><div class='line' id='LC167'>&nbsp;&nbsp;&nbsp;&nbsp;return this.targetId = $(this.target).attr('id');</div><div class='line' id='LC168'>&nbsp;&nbsp;};</div><div class='line' id='LC169'><br/></div><div class='line' id='LC170'>&nbsp;&nbsp;EndlessScroll.prototype.detectScrollDirection = function() {</div><div class='line' id='LC171'>&nbsp;&nbsp;&nbsp;&nbsp;var currentScrollTop;</div><div class='line' id='LC172'>&nbsp;&nbsp;&nbsp;&nbsp;this.didScroll = true;</div><div class='line' id='LC173'>&nbsp;&nbsp;&nbsp;&nbsp;currentScrollTop = $(this.target).scrollTop();</div><div class='line' id='LC174'>&nbsp;&nbsp;&nbsp;&nbsp;if (currentScrollTop &gt; this.lastScrollTop) {</div><div class='line' id='LC175'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.scrollDirection = 'next';</div><div class='line' id='LC176'>&nbsp;&nbsp;&nbsp;&nbsp;} else {</div><div class='line' id='LC177'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.scrollDirection = 'prev';</div><div class='line' id='LC178'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC179'>&nbsp;&nbsp;&nbsp;&nbsp;return this.lastScrollTop = currentScrollTop;</div><div class='line' id='LC180'>&nbsp;&nbsp;};</div><div class='line' id='LC181'><br/></div><div class='line' id='LC182'>&nbsp;&nbsp;EndlessScroll.prototype.shouldTryFiring = function() {</div><div class='line' id='LC183'>&nbsp;&nbsp;&nbsp;&nbsp;var shouldTryOrNot;</div><div class='line' id='LC184'>&nbsp;&nbsp;&nbsp;&nbsp;shouldTryOrNot = this.didScroll &amp;&amp; this.firing === true;</div><div class='line' id='LC185'>&nbsp;&nbsp;&nbsp;&nbsp;if (shouldTryOrNot) {</div><div class='line' id='LC186'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.didScroll = false;</div><div class='line' id='LC187'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC188'>&nbsp;&nbsp;&nbsp;&nbsp;return shouldTryOrNot;</div><div class='line' id='LC189'>&nbsp;&nbsp;};</div><div class='line' id='LC190'><br/></div><div class='line' id='LC191'>&nbsp;&nbsp;EndlessScroll.prototype.ceaseFireWhenNecessary = function() {</div><div class='line' id='LC192'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.options.ceaseFireOnEmpty === true &amp;&amp; this.lastContent === '' || this.options.ceaseFire.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection])) {</div><div class='line' id='LC193'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.firing = false;</div><div class='line' id='LC194'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return true;</div><div class='line' id='LC195'>&nbsp;&nbsp;&nbsp;&nbsp;} else {</div><div class='line' id='LC196'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return false;</div><div class='line' id='LC197'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC198'>&nbsp;&nbsp;};</div><div class='line' id='LC199'><br/></div><div class='line' id='LC200'>&nbsp;&nbsp;EndlessScroll.prototype.wrapContainer = function(target) {</div><div class='line' id='LC201'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.innerWrap.length === 0) {</div><div class='line' id='LC202'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.innerWrap = $(target).wrapInner('&lt;div class=&quot;endless_scroll_content&quot; data-page=&quot;0&quot; /&gt;').wrapInner('&lt;div class=&quot;endless_scroll_inner_wrap&quot; /&gt;').find('.endless_scroll_inner_wrap');</div><div class='line' id='LC203'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC204'>&nbsp;&nbsp;};</div><div class='line' id='LC205'><br/></div><div class='line' id='LC206'>&nbsp;&nbsp;EndlessScroll.prototype.scrollableAreaMargin = function(innerWrap, target) {</div><div class='line' id='LC207'>&nbsp;&nbsp;&nbsp;&nbsp;var margin;</div><div class='line' id='LC208'>&nbsp;&nbsp;&nbsp;&nbsp;switch (this.scrollDirection) {</div><div class='line' id='LC209'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'next':</div><div class='line' id='LC210'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin = innerWrap.height() - $(target).height() &lt;= $(target).scrollTop() + this.options.inflowPixels;</div><div class='line' id='LC211'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (margin) {</div><div class='line' id='LC212'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target.scrollTop(innerWrap.height() - $(target).height() - this.options.inflowPixels);</div><div class='line' id='LC213'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC214'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;</div><div class='line' id='LC215'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'prev':</div><div class='line' id='LC216'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin = $(target).scrollTop() &lt;= this.options.inflowPixels;</div><div class='line' id='LC217'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (margin) {</div><div class='line' id='LC218'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target.scrollTop(this.options.inflowPixels);</div><div class='line' id='LC219'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC220'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC221'>&nbsp;&nbsp;&nbsp;&nbsp;return margin;</div><div class='line' id='LC222'>&nbsp;&nbsp;};</div><div class='line' id='LC223'><br/></div><div class='line' id='LC224'>&nbsp;&nbsp;EndlessScroll.prototype.calculateScrollableCanvas = function() {</div><div class='line' id='LC225'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.target[0] === document || this.target[0] === window) {</div><div class='line' id='LC226'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.wrapContainer(&quot;body&quot;);</div><div class='line' id='LC227'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.isScrollable = this.scrollableAreaMargin($(document), $(window));</div><div class='line' id='LC228'>&nbsp;&nbsp;&nbsp;&nbsp;} else {</div><div class='line' id='LC229'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.wrapContainer(this.target);</div><div class='line' id='LC230'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.isScrollable = this.innerWrap.length &gt; 0 &amp;&amp; this.scrollableAreaMargin(this.innerWrap, this.target);</div><div class='line' id='LC231'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC232'>&nbsp;&nbsp;};</div><div class='line' id='LC233'><br/></div><div class='line' id='LC234'>&nbsp;&nbsp;EndlessScroll.prototype.shouldBeFiring = function() {</div><div class='line' id='LC235'>&nbsp;&nbsp;&nbsp;&nbsp;this.calculateScrollableCanvas();</div><div class='line' id='LC236'>&nbsp;&nbsp;&nbsp;&nbsp;return this.isScrollable &amp;&amp; (this.options.fireOnce === false || (this.options.fireOnce === true &amp;&amp; this.fired !== true));</div><div class='line' id='LC237'>&nbsp;&nbsp;};</div><div class='line' id='LC238'><br/></div><div class='line' id='LC239'>&nbsp;&nbsp;EndlessScroll.prototype.resetFireSequenceWhenNecessary = function() {</div><div class='line' id='LC240'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.options.resetCounter.apply(this.target) === true) {</div><div class='line' id='LC241'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.fireSequence = 0;</div><div class='line' id='LC242'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC243'>&nbsp;&nbsp;};</div><div class='line' id='LC244'><br/></div><div class='line' id='LC245'>&nbsp;&nbsp;EndlessScroll.prototype.acknowledgeFiring = function() {</div><div class='line' id='LC246'>&nbsp;&nbsp;&nbsp;&nbsp;this.fired = true;</div><div class='line' id='LC247'>&nbsp;&nbsp;&nbsp;&nbsp;this.fireSequence++;</div><div class='line' id='LC248'>&nbsp;&nbsp;&nbsp;&nbsp;switch (this.scrollDirection) {</div><div class='line' id='LC249'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'next':</div><div class='line' id='LC250'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.pageSequence = this.nextSequence++;</div><div class='line' id='LC251'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'prev':</div><div class='line' id='LC252'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.pageSequence = this.prevSequence--;</div><div class='line' id='LC253'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC254'>&nbsp;&nbsp;};</div><div class='line' id='LC255'><br/></div><div class='line' id='LC256'>&nbsp;&nbsp;EndlessScroll.prototype.insertContent = function(content) {</div><div class='line' id='LC257'>&nbsp;&nbsp;&nbsp;&nbsp;switch (this.scrollDirection) {</div><div class='line' id='LC258'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'next':</div><div class='line' id='LC259'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return $(this.options.insertAfter).after(content);</div><div class='line' id='LC260'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'prev':</div><div class='line' id='LC261'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return $(this.options.insertBefore).before(content);</div><div class='line' id='LC262'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC263'>&nbsp;&nbsp;};</div><div class='line' id='LC264'><br/></div><div class='line' id='LC265'>&nbsp;&nbsp;EndlessScroll.prototype.insertLoader = function() {</div><div class='line' id='LC266'>&nbsp;&nbsp;&nbsp;&nbsp;return this.insertContent(&quot;&lt;div class=\&quot;endless_scroll_loader_&quot; + this.targetId + &quot;      endless_scroll_loader\&quot;&gt;&quot; + this.options.loader + &quot;&lt;/div&gt;&quot;);</div><div class='line' id='LC267'>&nbsp;&nbsp;};</div><div class='line' id='LC268'><br/></div><div class='line' id='LC269'>&nbsp;&nbsp;EndlessScroll.prototype.removeLoader = function() {</div><div class='line' id='LC270'>&nbsp;&nbsp;&nbsp;&nbsp;return $('.endless_scroll_loader_' + this.targetId).fadeOut(function() {</div><div class='line' id='LC271'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return $(this).remove();</div><div class='line' id='LC272'>&nbsp;&nbsp;&nbsp;&nbsp;});</div><div class='line' id='LC273'>&nbsp;&nbsp;};</div><div class='line' id='LC274'><br/></div><div class='line' id='LC275'>&nbsp;&nbsp;EndlessScroll.prototype.hasContent = function() {</div><div class='line' id='LC276'>&nbsp;&nbsp;&nbsp;&nbsp;if (typeof this.options.content === 'function') {</div><div class='line' id='LC277'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.content = this.options.content.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]);</div><div class='line' id='LC278'>&nbsp;&nbsp;&nbsp;&nbsp;} else {</div><div class='line' id='LC279'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.content = this.options.content;</div><div class='line' id='LC280'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC281'>&nbsp;&nbsp;&nbsp;&nbsp;return this.content !== false;</div><div class='line' id='LC282'>&nbsp;&nbsp;};</div><div class='line' id='LC283'><br/></div><div class='line' id='LC284'>&nbsp;&nbsp;EndlessScroll.prototype.showContent = function() {</div><div class='line' id='LC285'>&nbsp;&nbsp;&nbsp;&nbsp;$('#endless_scroll_content_current').removeAttr('id');</div><div class='line' id='LC286'>&nbsp;&nbsp;&nbsp;&nbsp;return this.insertContent(&quot;&lt;div id=\&quot;endless_scroll_content_current\&quot;      class=\&quot;endless_scroll_content\&quot; data-page=\&quot;&quot; + this.pageSequence + &quot;\&quot;&gt;&quot; + this.content + &quot;&lt;/div&gt;&quot;);</div><div class='line' id='LC287'>&nbsp;&nbsp;};</div><div class='line' id='LC288'><br/></div><div class='line' id='LC289'>&nbsp;&nbsp;EndlessScroll.prototype.fireCallback = function() {</div><div class='line' id='LC290'>&nbsp;&nbsp;&nbsp;&nbsp;return this.options.callback.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]);</div><div class='line' id='LC291'>&nbsp;&nbsp;};</div><div class='line' id='LC292'><br/></div><div class='line' id='LC293'>&nbsp;&nbsp;EndlessScroll.prototype.cleanUpPagesWhenNecessary = function() {</div><div class='line' id='LC294'>&nbsp;&nbsp;&nbsp;&nbsp;var pageToRemove;</div><div class='line' id='LC295'>&nbsp;&nbsp;&nbsp;&nbsp;if (!(this.options.pagesToKeep &gt;= 1)) {</div><div class='line' id='LC296'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;</div><div class='line' id='LC297'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC298'>&nbsp;&nbsp;&nbsp;&nbsp;switch (this.scrollDirection) {</div><div class='line' id='LC299'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'next':</div><div class='line' id='LC300'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.pagesStack.push(this.pageSequence);</div><div class='line' id='LC301'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;</div><div class='line' id='LC302'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'prev':</div><div class='line' id='LC303'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.pagesStack.unshift(this.pageSequence);</div><div class='line' id='LC304'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC305'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.pagesStack.length &gt; this.options.pagesToKeep) {</div><div class='line' id='LC306'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch (this.scrollDirection) {</div><div class='line' id='LC307'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'next':</div><div class='line' id='LC308'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pageToRemove = this.prevSequence = this.pagesStack.shift();</div><div class='line' id='LC309'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;</div><div class='line' id='LC310'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'prev':</div><div class='line' id='LC311'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pageToRemove = this.nextSequence = this.pagesStack.pop();</div><div class='line' id='LC312'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC313'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC314'>&nbsp;&nbsp;&nbsp;&nbsp;this.removePage(pageToRemove);</div><div class='line' id='LC315'>&nbsp;&nbsp;&nbsp;&nbsp;return this.calculateScrollableCanvas();</div><div class='line' id='LC316'>&nbsp;&nbsp;};</div><div class='line' id='LC317'><br/></div><div class='line' id='LC318'>&nbsp;&nbsp;EndlessScroll.prototype.removePage = function(page) {</div><div class='line' id='LC319'>&nbsp;&nbsp;&nbsp;&nbsp;return $(&quot;.endless_scroll_content[data-page='&quot; + page + &quot;']&quot;, this.target).remove();</div><div class='line' id='LC320'>&nbsp;&nbsp;};</div><div class='line' id='LC321'><br/></div><div class='line' id='LC322'>&nbsp;&nbsp;EndlessScroll.prototype.delayFiringWhenNecessary = function() {</div><div class='line' id='LC323'>&nbsp;&nbsp;&nbsp;&nbsp;var _this = this;</div><div class='line' id='LC324'>&nbsp;&nbsp;&nbsp;&nbsp;if (this.options.fireDelay &gt; 0) {</div><div class='line' id='LC325'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$('body').after('&lt;div id=&quot;endless_scroll_marker&quot;&gt;&lt;/div&gt;');</div><div class='line' id='LC326'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return $('#endless_scroll_marker').fadeTo(this.options.fireDelay, 1, function() {</div><div class='line' id='LC327'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$('#endless_scroll_marker').remove();</div><div class='line' id='LC328'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return _this.fired = false;</div><div class='line' id='LC329'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});</div><div class='line' id='LC330'>&nbsp;&nbsp;&nbsp;&nbsp;} else {</div><div class='line' id='LC331'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return this.fired = false;</div><div class='line' id='LC332'>&nbsp;&nbsp;&nbsp;&nbsp;}</div><div class='line' id='LC333'>&nbsp;&nbsp;};</div><div class='line' id='LC334'><br/></div><div class='line' id='LC335'>&nbsp;&nbsp;return EndlessScroll;</div><div class='line' id='LC336'><br/></div><div class='line' id='LC337'>})();</div><div class='line' id='LC338'><br/></div><div class='line' id='LC339'>(function($) {</div><div class='line' id='LC340'>&nbsp;&nbsp;return $.fn.endlessScroll = function(options) {</div><div class='line' id='LC341'>&nbsp;&nbsp;&nbsp;&nbsp;return new EndlessScroll(this, options).run();</div><div class='line' id='LC342'>&nbsp;&nbsp;};</div><div class='line' id='LC343'>})(jQuery);</div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>
      </div>
    </div>

  </div>

<div class="frame frame-loading large-loading-area" style="display:none;" data-tree-list-url="/fredwu/jquery-endless-scroll/tree-list/993832f29ecfac79e4c12ac625504fd9910d7f8f" data-blob-url-prefix="/fredwu/jquery-endless-scroll/blob/993832f29ecfac79e4c12ac625504fd9910d7f8f">
  <img src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-64.gif?1334862346" height="64" width="64">
</div>

      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer" >
        
  <div class="upper_footer">
     <div class="container clearfix">

       <!--[if IE]><h4 id="blacktocat_ie">GitHub Links</h4><![endif]-->
       <![if !IE]><h4 id="blacktocat">GitHub Links</h4><![endif]>

       <ul class="footer_nav">
         <h4>GitHub</h4>
         <li><a href="https://github.com/about">About</a></li>
         <li><a href="https://github.com/blog">Blog</a></li>
         <li><a href="https://github.com/features">Features</a></li>
         <li><a href="https://github.com/contact">Contact &amp; Support</a></li>
         <li><a href="https://github.com/training">Training</a></li>
         <li><a href="http://enterprise.github.com/">GitHub Enterprise</a></li>
         <li><a href="http://status.github.com/">Site Status</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Tools</h4>
         <li><a href="http://get.gaug.es/">Gauges: Analyze web traffic</a></li>
         <li><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></li>
         <li><a href="https://gist.github.com">Gist: Code snippets</a></li>
         <li><a href="http://mac.github.com/">GitHub for Mac</a></li>
         <li><a href="http://mobile.github.com/">Issues for iPhone</a></li>
         <li><a href="http://jobs.github.com/">Job Board</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Extras</h4>
         <li><a href="http://shop.github.com/">GitHub Shop</a></li>
         <li><a href="http://octodex.github.com/">The Octodex</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Documentation</h4>
         <li><a href="http://help.github.com/">GitHub Help</a></li>
         <li><a href="http://developer.github.com/">Developer API</a></li>
         <li><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></li>
         <li><a href="http://pages.github.com/">GitHub Pages</a></li>
       </ul>

     </div><!-- /.site -->
  </div><!-- /.upper_footer -->

<div class="lower_footer">
  <div class="container clearfix">
    <!--[if IE]><div id="legal_ie"><![endif]-->
    <![if !IE]><div id="legal"><![endif]>
      <ul>
          <li><a href="https://github.com/site/terms">Terms of Service</a></li>
          <li><a href="https://github.com/site/privacy">Privacy</a></li>
          <li><a href="https://github.com/security">Security</a></li>
      </ul>

      <p>&copy; 2012 <span title="0.06870s from fe13.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
    </div><!-- /#legal or /#legal_ie-->

      <div class="sponsor">
        <a href="http://www.rackspace.com" class="logo">
          <img alt="Dedicated Server" height="36" src="https://a248.e.akamai.net/assets.github.com/images/modules/footer/rackspaces_logo.png?1334862346" width="38" />
        </a>
        Powered by the <a href="http://www.rackspace.com ">Dedicated
        Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
        Computing</a> of Rackspace Hosting<span>&reg;</span>
      </div>
  </div><!-- /.site -->
</div><!-- /.lower_footer -->

      </div><!-- /#footer -->

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
        <dd>Submit comment</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues Dashboard</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>w</dt>
          <dd>Switch branch/tag</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first">
        <h3>Browsing Commits</h3>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>escape</dt>
          <dd>Close form</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>p</dt>
          <dd>Parent commit</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o</dt>
          <dd>Other parent commit</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:

> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>


    <div class="ajax-error-message">
      <p><span class="icon"></span> Something went wrong with that request. Please try again. <a href="javascript:;" class="ajax-error-dismiss">Dismiss</a></p>
    </div>

    <div id="logo-popup">
      <h2>Looking for the GitHub logo?</h2>
      <ul>
        <li>
          <h4>GitHub Logo</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip"><img alt="Github_logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/github_logo.png?1334862345" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip" class="minibutton btn-download download"><span><span class="icon"></span>Download</span></a>
        </li>
        <li>
          <h4>The Octocat</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip"><img alt="Octocat" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/octocat.png?1334862345" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip" class="minibutton btn-download download"><span><span class="icon"></span>Download</span></a>
        </li>
      </ul>
    </div>

    
    
    
    <span id='server_response_time' data-time='0.07195' data-host='fe13'></span>
  </body>
</html>

