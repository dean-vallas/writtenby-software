
if (function () {
    try { eval('(async () => { for await (let v of [{ async* [Symbol.asyncIterator]() { yield {x: 1} } }]) { let {a, ...b} = {...v} } })().finally(() => {})') } catch (e) { return true }

    return false
}()) {
    location.href = '/unsupported_browser'
}


(function () {
    if (!window.INITIAL_OPTIONS) {
        window.INITIAL_OPTIONS = {};
    }

    window.INITIAL_OPTIONS.feature_flags = { "al_v3_dirty_instances_nat_size": true, "al_v3_inval_render_tree_fix": true, "always_free_node_memory": true, "animation_inspection_panel": true, "antispam_edu_senders": true, "antispam_invite_template": true, "antispam_rl_invite_from_new_user": true, "async_jobs_use_sqs": true, "aus_minimal_orgs": true, "auto_layout_file_load_analytics": true, "batch_component_actions": true, "branching_and_merging_creation": true, "browse_ia": true, "browse_ia_account_picker_hints": true, "browse_ia_settings_modal": true, "checkpoint_freq_override": true, "community_hub_ga": true, "community_hub_image_inspection": true, "community_popularity_time_decay": true, "community_shelves": true, "community_show_related_content": true, "connectors_path_customization": true, "connectors_text_customization": true, "csp_prod": true, "csp_prod_admin": true, "csp_prod_admin_enforce": true, "csp_prod_enforce": true, "csp_prod_report": true, "cursor_chat": true, "custom_wasm_memory": true, "db_request_reconnect": true, "deep_search_indexing": true, "deep_search_live_launch": true, "defer_invisible_children": true, "defer_update_default_style": true, "disable_free_in_malloc": true, "disable_long_frame_time": true, "disable_preserve_drawing_buffer": true, "edu_verification_form_updated": true, "enable_exp_branching_filter": true, "exp_branching": true, "exp_comments_entry_point": true, "exp_community_trending_weights": true, "exp_file_load_state": true, "exp_guest_management_admin": true, "exp_popularity_time_decay": true, "figjam": true, "figjam_allow_paste_into_design": true, "figjam_billing_status_orgs": true, "figjam_billing_status_orgs_m4": true, "figjam_billing_status_pro_m4": true, "figjam_billing_status_whiteboard": true, "figjam_bug_button_support": true, "figjam_copy_paste_offset": true, "figjam_delightful_toolbar": true, "figjam_ga": true, "figjam_launch_announcement": true, "figjam_launch_browser": true, "figjam_launch_growth": true, "figjam_pro_billing": true, "figjam_show_bug_button": true, "font_skip_inter": true, "font_skip_inter_variable": true, "font_skip_sf_pro": true, "free_tier_refresh_launch": true, "frontend_sentry_errors": true, "fullscreen_blur_render_ds": true, "fullscreen_mp_round_trip_latency": true, "gtm_geolocation": true, "hardware_acceleration_warning": true, "image_cache_redis_clustered": true, "inspect_panel_parent_components": true, "ipad_editor": true, "library_search_worker": true, "livegraph_comments": true, "livegraph_realtime_channels": true, "memory_warning_banner": true, "memory_warning_lower_thresh": true, "menu_search_metrics_tracker": true, "modal_dropdown_menus": true, "multilevel_dropdown_scroll": true, "multiplayer_al_circ_inval_fix": true, "multiplayer_buffer_node_changes": true, "multiplayer_checkpoints_180": true, "multiplayer_checkpoints_75": true, "multiplayer_hide_cursors": true, "multiplayer_max_conn_100": true, "multiplayer_max_conn_500": true, "multiplayer_suppress_broadcast": true, "multiplayer_zstd_compression": true, "nodes_link_to_root_styles": true, "pre_figjam_launch_promo": true, "prevent_instance_style_dirty": true, "private_oembed_support": true, "pro_team_billing_status_filter": true, "pro_team_dashboard": true, "prototype_lib_missing_fonts": true, "prototype_lib_reuse_doc_syncing": true, "quick_commands_floating_search": true, "quick_commands_metrics_tracker": true, "quick_commands_popularity_rank": true, "random_page_rampup": true, "read_from_replica": true, "recaptcha_frontend_web": true, "recaptcha_serverside_enforce": true, "remote_work_templates": true, "safari_webgl_workaround": true, "security_logging_firehose": true, "server_side_contacts": true, "show_drop_size_drag_thumbnails": true, "show_menu_item_al_symbol_repub": true, "show_menu_item_repub_selected": true, "show_state_group_size_errors": true, "slack_install_flow": true, "survey_org_cart_abandon": true, "survey_pro_cart_abandon": true, "team_user_direct": true, "text_lists": true, "text_lists_entry_points": true, "text_lists_entry_points_design": true, "text_lists_metrics": true, "text_lists_rcs": true, "try_undelete_checkpoints": true, "unhandled_rejection": true, "use_appconfig": true, "ux_feedback_survey": true, "viewer_aa_only_paths": true, "viewer_blur_render_ds": true, "viewer_ssaa_only_lower_dpr": true, "voice_unmute_on_join": true };
    window.INITIAL_OPTIONS.interactive_components_beta = false;
    window.INITIAL_OPTIONS.tracking_session_id = "QOAxzCr6NAGuCeAE";
    window.INITIAL_OPTIONS.cluster_name = "prod";
    window.INITIAL_OPTIONS.error_dashboard_url = "https://errors.figma.com/api";
    window.INITIAL_OPTIONS.frontend_sentry_dsn = "https://d1b12a8fbe424e4b956eb33cadd5b30d@errors.figma.com/api/sentry/56203";
    window.INITIAL_OPTIONS.figma_email_suffix = "@figma.com";
    window.INITIAL_OPTIONS.csp_nonce = "toc2t5/FXL1r6DL49N89DQ==";
    window.INITIAL_OPTIONS.figma_url = "https://www.figma.com";

    window.INITIAL_OPTIONS.flash = {
        error: null,
        warn: null,
        success: null
    }

    window.INITIAL_OPTIONS.user_flags = [{ "id": 263131303, "user_id": 975215317424240993, "name": "account_switcher_onboarded", "created_at": "2021-05-15T01:59:37.763Z", "updated_at": "2021-05-15T01:59:37.763Z" }, { "id": 263131304, "user_id": 975215317424240993, "name": "coco_onboarded", "created_at": "2021-05-15T01:59:37.772Z", "updated_at": "2021-05-15T01:59:37.772Z" }, { "id": 263131301, "user_id": 975215317424240993, "name": "community_hub_onboarded", "created_at": "2021-05-15T01:59:37.744Z", "updated_at": "2021-05-15T01:59:37.744Z" }, { "id": 263131300, "user_id": 975215317424240993, "name": "file_browser_onboarded", "created_at": "2021-05-15T01:59:37.735Z", "updated_at": "2021-05-15T01:59:37.735Z" }, { "id": 263131299, "user_id": 975215317424240993, "name": "has_seen_unified_search_more_results_pointer", "created_at": "2021-05-15T01:59:37.731Z", "updated_at": "2021-05-15T01:59:37.731Z" }, { "id": 263131388, "user_id": 975215317424240993, "name": "seen_community_comments_onboarding", "created_at": "2021-05-15T02:00:08.243Z", "updated_at": "2021-05-15T02:00:08.243Z" }, { "id": 263131390, "user_id": 975215317424240993, "name": "seen_community_comments_tips", "created_at": "2021-05-15T02:00:11.081Z", "updated_at": "2021-05-15T02:00:25.208Z" }, { "id": 263131305, "user_id": 975215317424240993, "name": "seen_community_hub_search_onboarding", "created_at": "2021-05-15T01:59:38.077Z", "updated_at": "2021-05-15T02:00:08.230Z" }, { "id": 263131526, "user_id": 975215317424240993, "name": "seen_config_announcements", "created_at": "2021-05-15T02:01:16.578Z", "updated_at": "2021-05-15T02:01:16.578Z" }, { "id": 263131042, "user_id": 975215317424240993, "name": "use_numbers_for_opacity", "created_at": "2021-05-15T01:57:30.940Z", "updated_at": "2021-05-15T01:57:30.940Z" }, { "id": 263131302, "user_id": 975215317424240993, "name": "variants_onboarded", "created_at": "2021-05-15T01:59:37.755Z", "updated_at": "2021-05-15T01:59:37.755Z" }, { "id": 263131209, "user_id": 975215317424240993, "name": "welcome_onboarded", "created_at": "2021-05-15T01:58:51.003Z", "updated_at": "2021-05-15T01:59:37.725Z" }]
    window.INITIAL_OPTIONS.user_data = { "id": "975215317424240993", "name": "Dean Vallas", "email": "spikes2k12@gmail.com", "handle": "Dean Vallas", "img_url": "https://www.gravatar.com/avatar/8e28285f2fef49a201ced5e32539d9eb?size=240\u0026default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_d_v2.png", "created_at": "2021-05-15T01:57:30.294Z", "email_validated_at": "2021-05-15T01:57:30.986Z", "unsubscribed_at": null, "utc_offset": null, "profile": { "job_title": "developer" }, "phone_number": null, "student_validated_at": null, "description": null, "plugin_publishing_blocked_at": null, "community_commenting_blocked_at": null, "dev_tokens": [], "oauth_tokens": [], "realtime_token": "/me-975215317424240993:1621044097:0:63d44cf223bffbe506100bd71ac64c49f4161de7", "realtime_token_inactive": "/user-inactive-975215317424240993:1621044097:0:6850a7f3cd694798a1ffeb4c54f1232ef744f6c6", "two_factor_enabled": false, "two_factor_app_enabled": false, "google_sso_only": "2021-05-15T01:57:30.290Z", "saml_sso_only": false, "experiment_seed": "939928", "community_profile_id": null, "community_profile_handle": null, "community_beta_at": null, "experiment_assignments": [], "teams": [{ "id": "975215323732506777", "name": "Dean Vallas's team", "created_at": "2021-05-15T01:57:31.798Z", "img_url": null, "synced_at": null, "providers": null, "stripe_customer_id": null, "subscription": null, "editors": 1, "projects": 1, "student_team_at": null, "student_autoverifying_team_at": null, "grace_period_end": null, "org_id": null, "img_urls": null, "org_access": null, "deleted_at": null, "blocked_at": null, "trial_period_end": null, "description": "This is your team's workspace. Invite members to your team to start collaborating. Click here to edit this description.", "deleted_by": null, "experiment_seed": 882083, "restrictions_list": ["projects_limited"], "student_team": false, "community_profile_id": null, "community_profile_handle": null, "is_paid": false, "experiment_assignments": [] }] };
    window.INITIAL_OPTIONS.smart_token = "975215317424240993-1d076ba3cb9f181d6cadf75d707487ea88d4cad31058cdc7a076e74a8c6031b1-1621043900";
    window.wootricSettings = {
        email: window.INITIAL_OPTIONS.user_data.email,
        created_at: Math.floor(new Date(window.INITIAL_OPTIONS.user_data.created_at).getTime() / 1000),
        account_token: "NPS-8d7627ca",
        product_name: 'Figma',
    };

    var _initial_options = { "resource_type": null, "email": "spikes2k12@gmail.com", "user_ip": "172.115.28.7", "redirect_url": null, "email_token": null, "access_code": null, "existing_session": true, "editing_file": null, "zeplin_plugin_id": "745330164019088593", "avocode_plugin_id": "821674268995163810", "org_id": null, "is_cloudfront": true, "iso_code": "US", "viewer_city": "North Hollywood" }
    for (var key in _initial_options) {
        window.INITIAL_OPTIONS[key] = _initial_options[key]
    }

    window.EARLY_ARGS = window.EARLY_ARGS || {};
    window.EARLY_ARGS.file_minimal_user_state = false;

    window.INITIAL_OPTIONS.user_notifications_bell = { bell: { "0": false } }
    window.INITIAL_OPTIONS.promo = null

    window.Fig = window.Fig || {};
    var _figOptions = { "importShimURL": "https://static.figma.com/fullscreen/303bac33ffdcdbb3d86f0af2a412ee8d3612aea5/import.shim.js.br", "importWorkerURL": "https://static.figma.com/fullscreen/303bac33ffdcdbb3d86f0af2a412ee8d3612aea5/import.worker.js.br", "figMigratorURL": "https://static.figma.com/fullscreen/303bac33ffdcdbb3d86f0af2a412ee8d3612aea5/fig_migrator.js.br", "jsvmCppURLs": { "jsvm-cpp.js": "https://static.figma.com/fullscreen/da00c86749491ba844de40ae0a1dcaae6da17aaf/jsvm-cpp.js.br", "jsvm-cpp.wasm": "https://static.figma.com/fullscreen/da00c86749491ba844de40ae0a1dcaae6da17aaf/jsvm-cpp.wasm.br" }, "fullscreenURLs": { "compiled_wasm.js": "https://static.figma.com/fullscreen/7b782cd456bf08ea96de8340da40973dacb79ba6/compiled_wasm.js.br", "compiled_wasm.wasm": "https://static.figma.com/fullscreen/7b782cd456bf08ea96de8340da40973dacb79ba6/compiled_wasm.wasm.br" }, "fullscreenScriptHash": "e3331b9f597422142eb448fbc8fed4bd5bd1923f", "librarySearchWorkerURL": "https://www.figma.com/figbuild-artifacts/library_search_worker.6055c05bff4e3bf0f98764a983550ea1.min.js.br", "vendorURL": "https://www.figma.com/figbuild-artifacts/vendor.cf5308a2a10442ab84b875f1164db145.min.js.br", "fullscreenWorkerURL": "", "migrationURLs": { "file_migrations_wasm.js": "https://static.figma.com/fullscreen/303bac33ffdcdbb3d86f0af2a412ee8d3612aea5/file_migrations_wasm.js", "file_migrations_wasm_bg.wasm": "https://static.figma.com/fullscreen/303bac33ffdcdbb3d86f0af2a412ee8d3612aea5/file_migrations_wasm_bg.wasm" }, "viewerScriptURL": "https://static.figma.com/fullscreen/7b782cd456bf08ea96de8340da40973dacb79ba6/viewer.js.br", "viewerWorkerURL": "https://static.figma.com/fullscreen/7b782cd456bf08ea96de8340da40973dacb79ba6/imagedecoder.js.br" };
    for (var key in _figOptions) {
        Fig[key] = _figOptions[key]
    }

    const pro_trial_json = { "pro_trials_v2_imported_component": { "published_components": { "file_name": "Music App", "file_key": "EPsAVfTmWm0rTWWt1xTThr", "checkpoint_id": 905231385563295691, "folder_name": "Pro Trial Checklist" }, "local_components": { "file_name": "Music App", "file_key": "aJNeFFEcSww5Fkj8YB882S", "checkpoint_id": 905231650961895864, "folder_name": "Pro Trial Checklist" }, "component_name": "Play Button" }, "pro_trials_v2_published_team_library": { "default": { "file_name": "Music App Design Library", "file_key": "D3JUit9Sj3zA01jZ2yIeAW", "checkpoint_id": 905230943858114618, "folder_name": "Pro Trial Checklist" } } }

    if (!!pro_trial_json.pro_trials_v2_imported_component) {
        const imported_component_json = pro_trial_json.pro_trials_v2_imported_component
        if (!!imported_component_json.published_components) {
            window.INITIAL_OPTIONS.pro_trials_v2_imported_component_file_name = pro_trial_json.pro_trials_v2_imported_component.published_components.file_name
        }
        window.INITIAL_OPTIONS.pro_trials_v2_component_name = imported_component_json.component_name
    }

    if (!!pro_trial_json.pro_trials_v2_published_team_library) {
        const published_team_library_json = pro_trial_json.pro_trials_v2_published_team_library
        if (!!published_team_library_json.default) {
            window.INITIAL_OPTIONS.pro_trials_v2_published_team_library_file_name = published_team_library_json.default.file_name
        }
    }


    window.INITIAL_OPTIONS.segment_web_key = "6Zhdn0wK1GLYzCsb0LIK0oQplS5TXcB2"

    window.INITIAL_OPTIONS.segment_fullscreen_key = "6uxDivlUmLf95lHRk0R8bZvr8zDxbX5E"

    window.INITIAL_OPTIONS.zendesk_web_key_public = "8f3196e1-a5a9-4a39-9b1c-6ab81db7fe17"

    window.INITIAL_OPTIONS.stripe_api_public = "pk_live_LKZ0RKjSZG2D2pwdtwrAhkiJ"

    window.INITIAL_OPTIONS.google_tag_manager_iframe_url = "https://marketing.figma.com"

    window.INITIAL_OPTIONS.recaptcha_v3_site_key = "6LcIlrcZAAAAAHFq-Y35ZDb93j_0ylEljiLU0NVk"
    window.INITIAL_OPTIONS.recaptcha_v3_ent_site_key = "6Le0W80aAAAAAGU9L7qz4o9tQVqrdJVv2M8XHIcd"

    window.INITIAL_OPTIONS.release_manifest_hash = "6125e4ea668f32f8ba4c66e0fb77ad8b"

    console.log('Running frontend commit', "1d17131588cc9c3c1653294581b3ff3e0d847d00")

    window.INITIAL_OPTIONS.release_manifest_git_commit = "1d17131588cc9c3c1653294581b3ff3e0d847d00"
    window.INITIAL_OPTIONS.release_server_git_commit = "d3984beb534348d5f37ba3a7cdb980f5e43ce1cc"
    window.INITIAL_OPTIONS.release_git_tag = "release-2021-05-13"
})();


window.FIGMA_BUNDLE = (function () {
    const pathsForModules = (() => {
        const _paths = {

        };

        const _loadedPaths = new Set()
        return {
            get: (key) => {
                return _paths[key];
            },
            hasLoaded: (key) => {
                return _loadedPaths.has(key)
            },
            setHasLoaded: (key) => {
                return _loadedPaths.add(key)
            },
        };
    })();

    const values = {};
    const promises = {};

    return {
        export: function (name, value) {
            if (!pathsForModules.get(name)) {
                console.warn('please add the "js_path" declaration in "pathsForModules" for "' + name + '".');
                return;
            }
            values[name] = value;
        },

        import: function (name) {
            const FAILURE_TEXT = 'failed to load "' + name + '" module!'
            if (values[name]) return Promise.resolve(values[name])

            const path = pathsForModules.get(name);
            if (!pathsForModules.get(name)) {
                return Promise.reject({ error: FAILURE_TEXT + ' "' + name + '" has not been added to "pathsForModules".' })
            }

            if (promises[path]) {
                return new Promise((resolve, reject) => {
                    promises[path].then(_ => resolve(values[name])).catch(error => reject({ error }));
                });
            }

            const promise = new Promise((resolve, reject) => {
                if (promises[path]) return;

                const script = document.createElement("script");
                script.setAttribute("async", true);
                script.setAttribute("nonce", "toc2t5/FXL1r6DL49N89DQ==")

                script.onload = function () {
                    resolve(values[name])
                };
                script.onerror = function (error) {
                    reject(error)
                };

                script.src = pathsForModules.get(name);
                pathsForModules.setHasLoaded(name);
                document.body.appendChild(script)
            });
            promises[path] = promise;
            return promise;
        },
    };
})();


(function (t) { var e = {}, r = function () { return this }(); return function n(o) { var s = e[o]; return s ? s.exports : (s = e[o] = { exports: {}, id: o, loaded: !1 }, t[o].call(r, s, s.exports, n), s.exports instanceof Function && (s.exports.default = s.exports), s.loaded = !0, s.exports) }(t.length - 1) })([
    (function (e, t, s) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }), self.global = self; const o = e => { var t; const s = null === (t = window.INITIAL_OPTIONS.user_data) || void 0 === t ? void 0 : t.id, o = window.INITIAL_OPTIONS.tracking_session_id; window.mpGlobal = { version: 51, sock: null, msgs: [], perfMetrics: [], url({ fileKey: t, role: i, oauthToken: n, nodeIds: r }) { let a = null; e && t === e.fileKey && e.targetFileVersion && (a = e.targetFileVersion); let w = "&incremental-loading=1"; "editor" === i && (w = "&incremental-loading=2", r && (w = `&incremental-loading=2&scenegraph-queries-initial-nodes=${r}`)); const d = window.INITIAL_OPTIONS.feature_flags, l = "editor" === i && d.multiplayer_zstd_compression || ("prototype" === i || "viewer" === i) && d.viewer_multiplayer_zstd; return `${location.protocol.replace("http", "ws")}//${location.host}/api/multiplayer/${t}?role=${i}` + `&tracking_session_id=${o}&version=${this.version}` + (n ? "&oauth_token=" + n : "") + w + (l ? "&compression=zstd" : "") + (s ? `&user-id=${s}` : "") + (a ? `&target-file-version=${a}` : "") }, preconnect(e) { if (this.sock) { if (e === this.sock.url && this.sock.readyState !== WebSocket.CLOSED) return; try { this.sock.close() } catch (t) { } } this.sock = new WebSocket(e), this.sock.binaryType = "arraybuffer", this.sock.onopen = (e => { this.perfMetrics.push({ key: "mp-ws-onopen", ts: performance.now(), nBytes: void 0 }) }), this.sock.onmessage = (e => { const t = new Uint8Array(e.data); this.msgs.push(t), this.perfMetrics.push({ key: "mp-ws-onmessage", ts: performance.now(), nBytes: t.length * t.BYTES_PER_ELEMENT }) }), this.msgs = [], this.perfMetrics = [] } }, e && mpGlobal.preconnect(mpGlobal.url(e)) }; (() => { const { file_minimal_user_state: e, mock_user_state_for_tests_json: t, multiplayer_preconnect_options: s } = window.EARLY_ARGS || {}; window.INITIAL_OPTIONS || (window.INITIAL_OPTIONS = {}), ((e, t) => { if (e) window.userStateXHR = { readyState: 4, status: 200, responseText: e }; else if (window.Fig) { if (!window.INITIAL_OPTIONS.user_data) return void (window.startUserStateXHR = (() => { })); window.startUserStateXHR = function (e) { var t, s = "/api/user/state", o = []; window.INITIAL_OPTIONS.org_id && o.push("org_id=" + window.INITIAL_OPTIONS.org_id), e && o.push("file_key=" + e), 0 !== o.length && (s += "?" + o.join("&")), window.userStateXHR = new XMLHttpRequest, window.userStateXHR.open("GET", s); const i = null === (t = window.INITIAL_OPTIONS.user_data) || void 0 === t ? void 0 : t.id; i && window.userStateXHR.setRequestHeader("X-Figma-User-ID", i), window.userStateXHR.send(); var n = window.performance ? window.performance.now() : -1; window.userStateXHR.addEventListener("load", function () { window.userStateXHRDuration = window.performance ? window.performance.now() - n : -1 }, !1), window.sessionStateXHR = new XMLHttpRequest, window.sessionStateXHR.open("GET", "/api/session/state"), i && window.sessionStateXHR.setRequestHeader("X-Figma-User-ID", i), window.sessionStateXHR.send() }; const e = "/preload-editor" === location.pathname || "/file/new" === location.pathname, s = window.INITIAL_OPTIONS.editing_file && window.INITIAL_OPTIONS.editing_file.key; t ? window.startUserStateXHR(s) : e || window.startUserStateXHR() } })(t, e), o(s) })() })]);

