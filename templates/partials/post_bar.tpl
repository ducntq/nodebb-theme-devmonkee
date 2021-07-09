<div class="topic-main-buttons pull-right inline-block">
	<span class="loading-indicator btn pull-left hidden" done="0">
		<span class="hidden-xs">[[topic:loading_more_posts]]</span> <i class="fa fa-refresh fa-spin"></i>
	</span>

	<!-- IF loggedIn -->
	<button component="topic/mark-unread" class="btn btn-sm btn-default" title="[[topic:mark_unread]]">
		<i class="fa fa-fw fa-inbox"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"></span>
	</button>
	<!-- ENDIF loggedIn -->
	
	{{{ if privileges.isAdmin }}}
	<button data-tid="{tid}" component="topic/unmark-homepage" class="btn btn-sm btn-default {{{ if !is_homepage }}} hidden {{{ end }}} " title="Unstick on homepage">
                <i class="fa fa-fw fa-toggle-on"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"></span>
        </button>
	<button data-tid="{tid}" component="topic/mark-homepage" class="btn btn-sm btn-default {{{ if is_homepage }}} hidden {{{ end }}} " title="Stick on homepage">
                <i class="fa fa-fw fa-toggle-off"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"></span>
    </button>
	{{{ end }}}
	

	<!-- IMPORT partials/topic/watch.tpl -->

	<!-- IMPORT partials/topic/sort.tpl -->

	<div class="inline-block">
	<!-- IMPORT partials/thread_tools.tpl -->
	</div>
	<!-- IMPORT partials/topic/reply-button.tpl -->
</div>
